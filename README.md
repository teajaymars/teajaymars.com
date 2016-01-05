Prerequisites:

* _Development_:
  * Set up [syntax highlighting with Pygments](https://gohugo.io/extras/highlighting/) before kicking off.
* _Deployment_:
  * Create a file in this directory called `s3cfg` using `s3cmd --configure`.
  * Give it credentials to access the tomre.es bucket on S3.

Development:

    hugo server --watch

Deployment:

    ./deploy.sh
