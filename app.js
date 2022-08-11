const express = require("express");

const bodyParser = require("body-parser");

const request = require("request");

const https = require("https");

//const mailchimp = require("@mailchimp/mailchimp_marketing");

const app = express();
//const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/signup.html");

  // *** Signup Route ***
  app.post("/", function (req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    // *** Requesting data ***
    const data = {
      members: [
        {
          email_address: email,
          status: "subscribed",
          merge_fields: {
            FNAME: firstName,
            LNAME: lastName,
          },
        },
      ],
    };

    // *** Stringify inputed data ***
    const jsonData = JSON.stringify(data);

    // *** url = "https://<data center>.api.mailchimp.com/3.0/lists/{listID}";
    const url = "https://us12.api.mailchimp.com/3.0/lists/9dedde677d";

    const options = {
      method: "POST",
      auth: "drreayy:4fe698ba5ae8736f6001def6a8be5e7d-us12",
    };

    // *** Requesting and posting inputs data to mailchimp ***
    const request = https.request(url, options, function (response) {
      // *** Verification ***
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }

      response.on("data", function (data) {
        console.log(JSON.parse(data));
      });
    });

    // *** Printing data from API to the terminal ***
    request.write(jsonData);
    // *** Ending ***
    request.end();
  });
});
// *** Redirecting Codes: ***
// *** Success to Homepage ***
app.post("/success", function (req, res) {
  res.redirect("/");
});

// *** Failure page to Homepage ***
app.post("/failure", (req, res) => {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Heroku Server now listening");
});

//**********JUNKS*************************** */
// const jsonData = JSON.stringify(data);
// // const url = "https://<dc>.api.mailchimp.com/3.0/9dedde677d";
// const url = "https://us12.api.mailchimp.com/3.0/lists/9dedde677d";
// const options = {
//   method: "POST",
//   auth: "drreayy:4fe698ba5ae8736f6001def6a8be5e7d-us12",
// };

// const request = https.request(url, options, function (response) {
//   response.on("data", function (data) {
//     JSON.parse(data);
//   });
// });

// request.write(jsonData);
// request.end();

/*const event = {
  name: "JS Developers Meetup",
};

const footerContactInfo = {
  company: "Mailchimp",
  address1: "675 Ponce de Leon Ave NE",
  address2: "Suite 5000",
  city: "Atlanta",
  state: "GA",
  zip: "30308",
  country: "US",
};

const campaignDefaults = {
  from_name: "Gettin' Together",
  from_email: "gettintogether@example.com",
  subject: "JS Developers Meetup",
  language: "EN_US",
};

async function run() {
  const response = await mailchimp.lists.createList({
    name: event.name,
    contact: footerContactInfo,
    permission_reminder: "permission_reminder",
    email_type_option: true,
    campaign_defaults: campaignDefaults,
  });

  console.log(
    `Successfully created an audience. The audience id is ${response.id}.`
  );
}

run();


  mailchimp.setConfig({
    apiKey: "4fe698ba5ae8736f6001def6a8be5e7d-us12",
    server: "us12",
  });
});

app.post("/", function (req, res) {
  const fName = req.body.firstName;
  const lName = req.body.lastName;
  const email = req.body.email;

  const member = {
    email_address: email,
    firsName: fName,
    lasName: lName,
  };

  const run = async () => {
    const response = await mailchimp.lists.createList("9dedde677d", {
      email_address: member.email,
      status: "subscribed",
      merge_fields: {
        FINAME: member.firsName,
        LANAME: member.lasName,
      },
    });
    console.log(`Added successfully with ID ${response.id}`);
    res.sendFile(__dirname + "/success.html");

    run().catch((e) => res.sendFile(__dirname + "/failure.html"));
    console.log("=========ERROR========");
  };
  run();
});*/

// Api Key
//4fe698ba5ae8736f6001def6a8be5e7d-us12

// Audience Id
// 9dedde677d
