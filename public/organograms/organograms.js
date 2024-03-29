(function () {
  var bind = function (fn, me) {
    return function () {
      return fn.apply(me, arguments);
    };
  };

  if (window.viz == null) {
    window.viz = {};
  }

  viz.shallowCopy = function (object) {
    var k, out, v;
    out = {};
    for (k in object) {
      v = object[k];
      out[k] = v;
    }
    return out;
  };

  viz.trim = function (x, maxlen) {
    if (maxlen >= 0 && x.length > maxlen) {
      return x.substr(0, maxlen) + "...";
    }
    return x;
  };

  viz.money_to_string = function (amount) {
    var out;
    out = "";
    amount = String(amount);
    while (amount.length > 3) {
      out = "," + amount.substring(amount.length - 3) + out;
      amount = amount.substring(0, amount.length - 3);
    }
    return amount + out;
  };

  d3.selection.prototype.moveToBack = function () {
    return this.each(function () {
      var firstChild;
      firstChild = this.parentNode.firstChild;
      if (firstChild) {
        return this.parentNode.insertBefore(this, firstChild);
      }
    });
  };

  d3.json("/organograms/data/csv/index.json", function (index) {
    var hash, hashIndex, indexNames, options, select;
    d3.select("#organograms-loading").remove();
    d3.select("#organograms-container").style("display", "block");
    select = d3.select("select#index");
    select.attr("disabled", null).classed("disabled", false);
    select.selectAll("option").text("Select a department...");
    options = select
      .selectAll("option")
      .data(index)
      .enter()
      .append("option")
      .text(function (d) {
        return d.name;
      })
      .attr("value", function (d) {
        return d.value;
      });
    $("select#index")
      .chosen()
      .on("change", function (e) {
        var text, val;
        val = $(e.delegateTarget).val();
        text = $(e.delegateTarget)
          .find('option[value="' + val + '"]')
          .text();
        viz.setActiveOrganogram(val, text);
        d3.select("#organogram-title").text("Loading...");
        return d3.select("#organogram-viz").html("");
      });
    indexNames = index.map(function (x) {
      return x.name;
    });
    hash = window.location.hash.substr(1);
    hashIndex = indexNames.indexOf(hash);
    if (hashIndex < 0) {
      hashIndex = 1;
    }
    viz.setActiveOrganogram(index[hashIndex].value, index[hashIndex].name);
    return $("select#index")
      .val(index[hashIndex].value)
      .trigger("chosen:updated");
  });

  viz.setActiveOrganogram = function (slug, title) {
    window.location.hash = title;
    viz.activeOrganogram = {
      junior: null,
      senior: null,
      slug: slug,
      title: title,
    };
    d3.csv("/organograms/data/csv/" + slug + "-senior.csv", function (senior) {
      if (viz.activeOrganogram.slug === slug) {
        viz.activeOrganogram.senior = senior;
        return viz.renderActiveOrganogram();
      }
    });
    return d3.csv(
      "/organograms/data/csv/" + slug + "-junior.csv",
      function (junior) {
        if (viz.activeOrganogram.slug === slug) {
          viz.activeOrganogram.junior = junior;
          return viz.renderActiveOrganogram();
        }
      }
    );
  };

  viz.renderActiveOrganogram = function () {
    var j, junior, l, len, len1, len2, lookup, m, parent, root, row, senior;
    senior = viz.activeOrganogram.senior;
    junior = viz.activeOrganogram.junior;
    if (!(senior && junior)) {
      return;
    }
    d3.select("#organogram-title").text(
      "Viewing: " + viz.activeOrganogram.title
    );
    root = null;
    lookup = {};
    for (j = 0, len = senior.length; j < len; j++) {
      row = senior[j];
      lookup[row["Post Unique Reference"]] = row;
      row["children"] = [];
    }
    for (l = 0, len1 = senior.length; l < len1; l++) {
      row = senior[l];
      parent = row["Reports to Senior Post"];
      row.senior = true;
      row.name = row["Job Title"] || "(unknown)";
      row.value = row["Actual Pay Floor (£)"];
      if (parent.toLowerCase() === "xx") {
        root = row;
      } else {
        lookup[parent]["children"].push(row);
      }
    }
    for (m = 0, len2 = junior.length; m < len2; m++) {
      row = junior[m];
      row.senior = false;
      row.name = row["Generic Job Title"] || "(unknown)";
      row.value = row["Payscale Minimum (£)"];
      parent = row["Reporting Senior Post"];
      lookup[parent]["children"].push(row);
    }
    return new viz.organogram(root);
  };

  window.viz.organogram = (function () {
    organogram.prototype.width = 940;

    organogram.prototype.height = 800;

    organogram.prototype.radius = 270;

    organogram.prototype.pw = 130;

    organogram.prototype.ph = 14;

    organogram.prototype.offset = function (y) {
      return (y * y) / this.radius;
    };

    organogram.prototype.color = d3.scale.category20c();

    function organogram(raw_root) {
      this.renderTreeMap = bind(this.renderTreeMap, this);
      this.renderOrgChart = bind(this.renderOrgChart, this);
      this.setData = bind(this.setData, this);
      this.linkPath = bind(this.linkPath, this);
      this.hoverPersonOut = bind(this.hoverPersonOut, this);
      this.hoverPerson = bind(this.hoverPerson, this);
      this.buildTreeMap = bind(this.buildTreeMap, this);
      this.buildOrgChart = bind(this.buildOrgChart, this);
      this.offset = bind(this.offset, this);
      var btnz, intro;
      this.orgChart = this.buildOrgChart(raw_root, "", "root");
      this.treeMap = this.buildTreeMap(this.orgChart);
      this.container = d3.select("#organogram-viz");
      this.svg = d3
        .select("#organogram-viz")
        .append("svg")
        .attr("width", this.width)
        .attr("height", this.height)
        .append("g")
        .attr(
          "transform",
          "translate(" + this.width / 2 + "," + this.height / 2 + ")"
        );
      this.defs = this.svg.append("defs");
      if (d3.select(".organogram-button:checked").attr("value") === "option2") {
        this.renderTreeMap((intro = true));
      } else {
        this.renderOrgChart((intro = true));
      }
      btnz = d3.selectAll(".organogram-button");
      btnz.on(
        "click",
        (function (_this) {
          return function (_x, index) {
            d3.selectAll(".organogram-click-hint").remove();
            btnz.classed("active", function (_x, i) {
              return i === index;
            });
            if (index === 0) {
              return _this.renderOrgChart();
            } else {
              return _this.renderTreeMap();
            }
          };
        })(this)
      );
      this.hoverBox = this.container.append("div").classed("hoverbox", true);
    }

    organogram.prototype.buildOrgChart = function (d, parentId, myId) {
      var child, i, out;
      out = {
        original: d,
        name: d.name,
        value: d.value,
        key: myId,
        group: parentId,
        isLeaf: true,
      };
      if (d.children && d.children.length) {
        out.isLeaf = false;
        out.group = myId;
        out.children = function () {
          var j, len, ref, results;
          ref = d.children;
          results = [];
          for (i = j = 0, len = ref.length; j < len; i = ++j) {
            child = ref[i];
            results.push(this.buildOrgChart(child, myId, myId + "." + i));
          }
          return results;
        }.call(this);
      }
      return out;
    };

    organogram.prototype.buildTreeMap = function (d) {
      var child, j, len, myself, out, ref;
      if (!d.children) {
        return d;
      }
      out = {
        key: "tmp-" + d.key,
        children: [],
      };
      myself = viz.shallowCopy(d);
      myself.children = void 0;
      out.children.push(myself);
      ref = d.children;
      for (j = 0, len = ref.length; j < len; j++) {
        child = ref[j];
        out.children.push(this.buildTreeMap(child));
      }
      return out;
    };

    organogram.prototype.hoverPerson = function () {
      var parent;
      parent = this;
      return function (d, i) {
        var bbox, bbox_parent, email_link, left, space, top, w;
        window.clearTimeout(window.viz.organogram_hover_timeout);
        if (parent.hovering === d.original) {
          return;
        }
        parent.hovering = d.original;
        w = 280;
        space = 20;
        bbox = this.getBoundingClientRect();
        bbox_parent = parent.container[0][0].getBoundingClientRect();
        if (
          bbox.left - bbox_parent.left + bbox.width / 2 >
          bbox_parent.width / 2
        ) {
          left = bbox.left - bbox_parent.left - w - space;
        } else {
          left = bbox.left - bbox_parent.left + bbox.width + space;
        }
        left = Math.max(0, Math.min(bbox_parent.width - w, left));
        top =
          bbox.top -
          bbox_parent.top +
          bbox.height / 2 -
          (d.original.senior ? 100 : 50);
        top = Math.max(-50, Math.min(bbox_parent.height - 100, top));
        parent.hoverBox.style({
          display: "block",
          left: Math.round(left) + "px",
          top: Math.round(top) + "px",
        });
        email_link = function (x) {
          return x;
        };
        if (d.original.senior) {
          return parent.hoverBox.html(
            '<table class="table table-bordered table-condensed"> <tr><td>Job&nbsp;Title</td><td>' +
              d.original["Job Title"] +
              "</td></tr> <tr><td>Unit</td><td>" +
              d.original["Unit"] +
              "</td></tr> <tr><td>Profession</td><td>" +
              d.original["Professional/Occupational Group"] +
              "</td></tr> <tr><td>Salary</td><td>£" +
              viz.money_to_string(d.original["Actual Pay Floor (£)"]) +
              " - £" +
              viz.money_to_string(d.original["Actual Pay Ceiling (£)"]) +
              '</td></tr> <tr><td>Type</td><td><em>Senior Civil Servant</em></td></tr> <tr><td colspan="2" style="text-align: left;font-weight:normal;font-style:italic;">' +
              d.original["Job/Team Function"] +
              "</td></tr> <tr><td>Name</td><td>" +
              d.original["Name"] +
              "</td></tr> <tr><td>Grade</td><td>" +
              d.original["Grade"] +
              "</td></tr> <tr><td>#&nbsp;Roles</td><td>" +
              d.original["FTE"] +
              " (full-time equivalent)</td></tr> <tr><td>Phone</td><td>" +
              d.original["Contact Phone"] +
              "</td></tr> <tr><td>Email</td><td>" +
              email_link(d.original["Contact E-mail"]) +
              "</td></tr> </table>"
          );
        } else {
          return parent.hoverBox.html(
            '<table class="table table-bordered table-condensed"> <tr><td>Job&nbsp;Title</td><td>' +
              d.original["Generic Job Title"] +
              "</td></tr> <tr><td>Unit</td><td>" +
              d.original["Unit"] +
              "</td></tr> <tr><td>Profession</td><td>" +
              d.original["Professional/Occupational Group"] +
              "</td></tr> <tr><td>Salary</td><td>£" +
              viz.money_to_string(d.original["Payscale Minimum (£)"]) +
              " - £" +
              viz.money_to_string(d.original["Payscale Maximum (£)"]) +
              "</td></tr> <tr><td>Type</td><td><em>Junior Civil Servant</em></td></tr> <tr><td>Grade</td><td>" +
              d.original["Grade"] +
              "</td></tr> <tr><td>#&nbsp;Roles</td><td>" +
              d.original["Number of Posts in FTE"] +
              " (full-time equivalent)</td></tr> </table>"
          );
        }
      };
    };

    organogram.prototype.hoverPersonOut = function (d, i) {
      window.clearTimeout(window.viz.organogram_hover_timeout);
      this.hovering = null;
      return (window.viz.organogram_hover_timeout = window.setTimeout(
        (function (_this) {
          return function () {
            return _this.hoverBox.style("display", "none");
          };
        })(this),
        300
      ));
    };

    organogram.prototype.linkPath = function (d) {
      var point, sx, sy, tx, ty;
      if (this.linkline == null) {
        this.linkline = d3.svg.line().interpolate("basis");
      }
      sx = ((d.source.x - 90) * Math.PI) / 180;
      sy = this.offset(d.source.y);
      tx = ((d.target.x - 90) * Math.PI) / 180;
      ty = this.offset(d.target.y);
      if (sy === 0) {
        sx = tx;
      }
      point = function (angle, offset) {
        return [Math.cos(angle) * offset, Math.sin(angle) * offset];
      };
      return this.linkline([
        point(sx, sy),
        point(sx, sy + 80),
        point(tx, ty - 40),
        point(tx, ty),
      ]);
    };

    organogram.prototype.setData = function (persons, links) {
      var bgcol,
        clippath_selection,
        g_enter,
        invertText,
        key,
        link_selection,
        person_selection;
      clippath_selection = this.defs.selectAll(".clipRect").data(
        persons,
        (key = function (d) {
          return d.key;
        })
      );
      clippath_selection.exit().remove();
      clippath_selection
        .enter()
        .append("clipPath")
        .classed("clipRect", true)
        .attr("id", function (d) {
          return d.key;
        })
        .append("rect")
        .attr("width", this.pw)
        .attr("height", this.ph);
      link_selection = this.svg.selectAll(".link").data(
        links,
        (key = function (d) {
          return d.target.key;
        })
      );
      link_selection
        .exit()
        .transition()
        .duration(500)
        .style("opacity", 0)
        .remove();
      link_selection
        .enter()
        .append("path")
        .classed("link", true)
        .attr("fill", "none")
        .attr("stroke", "rgba(0,0,0,0.2)")
        .attr("d", this.linkPath)
        .style("opacity", 0)
        .moveToBack();
      bgcol = (function (_this) {
        return function (d) {
          var out;
          out = d3.rgb(_this.color(d.group));
          if (d.isLeaf) {
            return out;
          } else {
            return out.darker(0.6);
          }
        };
      })(this);
      invertText = function (d) {
        return d3.hsl(bgcol(d)).l < 0.7;
      };
      person_selection = this.svg.selectAll(".person").data(
        persons,
        (key = function (d) {
          return d.key;
        })
      );
      person_selection.exit().remove();
      g_enter = person_selection
        .enter()
        .append("g")
        .classed("person", true)
        .attr("clip-path", function (d) {
          return "url(#" + d.key + ")";
        });
      g_enter
        .append("rect")
        .style("display", function (d) {
          if (d.name) {
            return "inline";
          } else {
            return "none";
          }
        })
        .attr("fill", bgcol)
        .on("mouseover", this.hoverPerson())
        .on("mouseout", this.hoverPersonOut);
      g_enter
        .append("text")
        .style("display", function (d) {
          if (d.name) {
            return "inline";
          } else {
            return "none";
          }
        })
        .classed("invertText", invertText)
        .attr("dx", "2px")
        .attr("dy", "1.2em")
        .style("font-size", "9px")
        .text(function (d) {
          return d.name;
        });
      return g_enter
        .append("text")
        .style("display", function (d) {
          if (d.name) {
            return "inline";
          } else {
            return "none";
          }
        })
        .classed("invertText", invertText)
        .attr("dx", "2px")
        .attr("dy", "2.4em")
        .style("font-size", "9px")
        .text(function (d) {
          if (!d.name) {
            return null;
          } else {
            return "£" + viz.money_to_string(d.value);
          }
        });
    };

    organogram.prototype.renderOrgChart = function (intro) {
      var duration, nodes, orgLayout, ripple;
      if (intro == null) {
        intro = false;
      }
      orgLayout = d3.layout.cluster().size([360, this.radius]);
      nodes = orgLayout.nodes(this.orgChart);
      ripple = (function (_this) {
        return function (d, i) {
          i = nodes.length - i;
          return i * 14;
        };
      })(this);
      duration = 500;
      if (intro) {
        duration = 0;
        ripple = function () {
          return 0;
        };
      }
      this.setData(nodes, orgLayout.links(nodes));
      this.svg
        .selectAll(".link")
        .transition()
        .transition()
        .duration(duration * 5)
        .delay(intro ? 0 : 1000)
        .style("opacity", 1);
      this.svg
        .selectAll(".person")
        .attr("display", "inline")
        .transition()
        .duration(duration)
        .delay(ripple)
        .attr(
          "transform",
          (function (_this) {
            return function (d) {
              if (d.y === 0) {
                return "translate(" + -_this.pw / 2 + "," + -_this.ph / 2 + ")";
              }
              if (d.x < 180) {
                return (
                  "translate(0," +
                  -_this.ph / 2 +
                  ")rotate(" +
                  (d.x - 90) +
                  ",0," +
                  _this.ph / 2 +
                  ")translate(" +
                  _this.offset(d.y) +
                  ")"
                );
              } else {
                return (
                  "translate(0," +
                  -_this.ph / 2 +
                  ")rotate(" +
                  (d.x - 270) +
                  ",0," +
                  _this.ph / 2 +
                  ")translate(" +
                  (-_this.offset(d.y) - _this.pw) +
                  ")"
                );
              }
            };
          })(this)
        );
      this.svg
        .selectAll(".person")
        .select("rect")
        .transition()
        .duration(duration)
        .delay(ripple)
        .attr("width", this.pw)
        .attr("height", this.ph);
      return this.svg
        .selectAll(".clipRect")
        .select("rect")
        .transition()
        .duration(duration)
        .delay(ripple)
        .attr("width", this.pw)
        .attr("height", this.ph);
    };

    organogram.prototype.renderTreeMap = function (intro) {
      var duration, groups, j, len, node, nodes, ripple, treemap;
      if (intro == null) {
        intro = false;
      }
      treemap = d3.layout
        .treemap()
        .size([this.width, this.height])
        .sticky(true)
        .value(function (d) {
          return d.value;
        });
      nodes = treemap.nodes(this.treeMap);
      groups = [];
      for (j = 0, len = nodes.length; j < len; j++) {
        node = nodes[j];
        if (groups.indexOf(node.group) < 0) {
          groups.push(node.group);
        }
      }
      this.setData(nodes, []);
      duration = 500;
      ripple = (function (_this) {
        return function (d, i) {
          var index;
          return i * 14;
          index = groups.indexOf(d.group);
          return (index % groups.length) * 260;
        };
      })(this);
      if (intro) {
        duration = 0;
        ripple = function () {
          return 0;
        };
      }
      this.svg
        .selectAll(".person")
        .attr("display", function (d) {
          if (d.value) {
            return "inline";
          } else {
            return "none";
          }
        })
        .transition()
        .duration(duration)
        .delay(ripple)
        .attr(
          "transform",
          (function (_this) {
            return function (d) {
              return (
                "translate(" +
                (d.x - _this.width / 2) +
                "," +
                (d.y - _this.height / 2) +
                ")"
              );
            };
          })(this)
        );
      this.svg
        .selectAll(".person")
        .select("rect")
        .transition()
        .duration(duration)
        .delay(ripple)
        .attr("width", function (d) {
          return d.dx;
        })
        .attr("height", function (d) {
          return d.dy;
        });
      return this.svg
        .selectAll(".clipRect")
        .select("rect")
        .transition()
        .duration(duration)
        .delay(ripple)
        .attr("width", function (d) {
          return Math.max(0, d.dx - 1);
        })
        .attr("height", function (d) {
          return Math.max(0, d.dy - 1);
        });
    };

    return organogram;
  })();
}).call(this);
