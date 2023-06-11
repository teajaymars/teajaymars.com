<script lang="ts" setup>
const title = "Building an RC Car using Lego and a Raspberry Pi";

useSeoMeta({
  title,
  description: "A guitar pedal board made from scrap wood and a bike chain.",
  ogImage: "/img/thumb/pedalboard.jpg",
});
</script>

<template>
  <article class="article content">
    <ArticleTitle timestamp="2012-12-03">{{ title }}</ArticleTitle>
    <p>
      <strong>Edit:</strong> See
      <a
        href="http://www.flickr.com/photos/zephod/sets/72157632285374850/"
        target="_blank"
        >the Lego/Raspberry Pi project on Flickr</a
      >
      for a photo diary of the construction process.
    </p>
    <p>
      <a href="http://www.flickr.com/photos/zephod/sets/72157632285374850/"
        ><img src="/img/legocar_flickr.jpg" alt="Flickr Photos"
      /></a>
    </p>
    <hr />
    <p>
      When I was a child I always wanted a remote control car. I never got one –
      usually my parents convinced me that the novelty would wear off in an
      hour, and that it wouldn’t be worth the expense. (They were probably
      right). I usually opted for a safer videogame-based option at Christmas
      time, and on my birthday I’d ask for Lego.
    </p>
    <p>
      <img src="/img/raspberrypi.jpg" alt="Raspberry Pi" />
    </p>
    <p>
      The Raspberry Pi – a tiny, low-power computer that fits in the palm of
      your hand – provided the inspiration for a project to finally put that
      right. Using bricks from my childhood Lego collection, and a wireless Xbox
      360 controller from my teenage years, at long last I could hack together a
      remote control car! How hard could it be?
    </p>
    <h2 id="not-exactly-simple">Not exactly simple</h2>
    <p>
      I’m a programmer by trade, but any knowledge of electronics learned during
      University apparently died at graduation. The necessary software
      configuration and ~200 lines of Python coding took very little time. The
      fairly simple circuitry took a <em>long</em> time, and caught fire on
      several occasions. Your mileage may vary.
    </p>
    <p>
      There have been similar attempts to control RC cars from an Xbox
      controller:
    </p>
    <ul>
      <li>
        <a href="http://www.youtube.com/watch?v=LHLnw9Yt1rk"
          >Dan from Chicago</a
        >
        put a Netduino controller on his car which connects via his laptop.
      </li>
      <li>
        <a
          href="http://www.jedibowler.com/2011/09/24/controlling-an-rc-car-with-an-xbox-360-controller-via-a-netduino/"
          >Keegan at jedibowler.com</a
        >
        used Netduino on the car as well, and has a PC on the floor issuing
        commands.
      </li>
    </ul>
    <p>
      This project takes it a step further because the Raspberry Pi is a
      complete computer, so <strong>all the hardware lives on the car</strong>.
      There is no need for a laptop issuing commands over Wifi.
    </p>
    <h2 id="building-the-chassis">Building the Chassis</h2>
    <p>
      The design of the chassis aims to be as simple and robust as possible.
    </p>
    <p><img src="/img/legocar1.jpg" alt="" /></p>
    <p>No, really, robustness is key. Some observations:</p>
    <ul>
      <li>Use Technic clip-joints and axles through everything.</li>
      <li>
        Using Lego studs to join any two parts of the chassis was a waste of
        effort. Shearing stress pulls them apart easily.
      </li>
      <li>
        Servos and motors would rather pull the Lego apart than turn the wheels.
        They need to be very firmly held in place.
      </li>
    </ul>
    <p>Two motors are required:</p>
    <ul>
      <li>
        The steering is controlled via a high torque
        <a href="http://adafruit.com/products/155"
          >180 degree Towerpro servo from AdaFruit</a
        >. A Lego gear is attached with superglue.
      </li>
      <li>
        The rear axle is attached to a
        <a href="http://shop.lego.com/en-US/LEGO-Power-Functions-XL-Motor-8882"
          >Lego Power Functions XL-Motor</a
        >.
      </li>
    </ul>
    <p>
      <img
        src="/img/legomotor.jpg"
        style="margin: 0 10px 10px 10px; float: right"
      />
      Originally I used an old 9V Technic motor, but it wasn’t strong enough to
      turn the rear axle. There’s a fascinating
      <a href="http://www.philohome.com/motors/motorcomp.htm"
        >analysis of Lego motors on philohome.com</a
      >
      which suggests that the newer motor has around 40 times more torque. I
      purchased one online for just $10.
    </p>
    <h2 id="electronics-and-soldering">Electronics and Soldering</h2>
    <p>
      The motors are controlled via PWM (<em>Pulse Width Modulation</em>) using
      the excellent
      <a href="http://adafruit.com/products/815"
        >Adafruit 16-channel PWM driver</a
      >.
    </p>
    <p><img src="/img/pwmdriver.png" alt="" /></p>
    <p>
      The
      <a
        href="http://learn.adafruit.com/adafruit-16-channel-servo-driver-with-raspberry-pi"
        >tutorials on Adafruit’s website</a
      >
      are truly exemplary, and in less than an hour I had the Raspberry Pi
      controlling motor speed and servo rotation.
    </p>
    <p><img src="/img/legocar2.jpg" alt="" /></p>
    <p>The above shot demonstrates circuitry mounted onto the chassis.</p>
    <ul>
      <li>
        Adafruit’s
        <a href="http://adafruit.com/products/914">Cobbler Breakout Kit</a> is
        used to connect the Raspberry Pi to a prototyping plug-board.
      </li>
      <li>
        The i2c connectors (<code>SDA0</code> and <code>SCL0</code>,
        <code>3v3</code> and <code>GND</code>) are then connected to the PWM
        driver.
      </li>
      <li>
        GPIO pins <code>21</code> and <code>17</code> are connected to a cheap
        <a href="http://en.wikipedia.org/wiki/H_bridge">H Bridge</a> chip,
        specifically the
        <a href="http://www.pololu.com/catalog/product/713"
          >TB6612FNG from pololu.com</a
        >. This will drive the main motor forwards or backwards.
      </li>
      <li>
        Output <code>0</code> on the PWM driver runs into the H Bridge. This
        controls the main motor’s speed.
      </li>
      <li>
        Output <code>1</code> on the PWM driver runs to the steering servo.
      </li>
    </ul>
    <h2 id="software">Software</h2>
    <p>
      Finally, the Raspberry Pi must be loaded with some software which
      translates Xbox controller buttons into motor speed, motor direction, and
      steering rotation.
    </p>
    <p><img src="/img/xboxdongle.jpg" alt="" /></p>
    <p>
      The
      <a
        href="http://www.amazon.co.uk/Xbox-Wireless-Gaming-Receiver-Windows/dp/B000MGVAAQ"
        >Xbox 360 Wireless Gaming Receiver for Windows</a
      >
      is required to connect the controller. Microsoft use a custom wireless
      protocol, so a regular Bluetooth modem will not work. This bulky device
      consumes quite a lot of power, but at least it is relatively inexpensive.
    </p>
    <p>
      “For Windows” should not be taken too seriously. Ingo Ruhnke’s excellent
      <a href="http://pingus.seul.org/~grumbel/xboxdrv/"
        >Xbox/Xbox 360 USB Gamepad Driver for Linux</a
      >
      is a perfect solution for hooking up the wireless USB device, and it
      installs in seconds on a Raspberry Pi running Ubuntu.
    </p>
    <p>
      At last, I can get back to programming! I hacked together a couple of
      Python modules to:
    </p>
    <ul>
      <li>
        Run <code>xboxdrv</code> as a subprocess, which connects to the
        controller.
      </li>
      <li>
        Read from the <code>stdout</code> pipe as it constantly prints out the
        controller state.
      </li>
      <li>
        Watch for changes in <code>LT</code> (left trigger),
        <code>RT</code> (right trigger) and <code>X1</code> (left thumbstick).
      </li>
      <li>Update the outputs as appropriate through Adafruit’s libraries.</li>
    </ul>
    <p>For example, to control the steering:</p>
    <pre>
# Left thumbstick controls the steering

if event.key==&#39;X1&#39;: steer = int( servoMid +
(servoWidth*-event.value)/32768 ) pwm.setPWM(1, 0, steer)</pre
    >
    <p>
      The complete software kit is available in
      <a href="http://github.com/zephod/lego-pi">a repository on Github</a>.
    </p>
    <h2 id="completion">Completion</h2>
    <p>Here’s my DIY-RC-Car in action. Enjoy!</p>
    <iframe
      frameborder="0"
      src="http://www.youtube.com/embed/X7YRqCCBDBU"
      width="600"
      height="400"
    ></iframe>
  </article>
</template>
