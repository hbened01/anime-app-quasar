const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const conection = require("./../database/db");
const { promisify } = require("util");

// verific correct access token
exports.login = async (req, res) => {
  try {
    const user = req.body.user;
    const password = req.body.password;
    // console.log(`${user} ${password}`);
    if (!user || !password) {
      // res.render("login", {
      //   alert: true,
      //   alertMessage: "Insert user and password",
      //   route: "login",
      // });
      res.status(401).json({
        success: false,
        message: "User and password are required",
      });
    } else {
      conection.query(
        `
        SELECT
          *
        FROM
          users
        WHERE
          1 = 1
          AND user = ?
        LIMIT 1
      `,
        [user],
        async (e, results) => {
          // console.log(results)
          if (
            results.length == 0 ||
            !(await bcryptjs.compare(password, results[0].passwd))
          ) {
            res.status(401).json({
              success: false,
              message: "User or password are incorrect, invalid credentials!!",
            });
          } else {
            // console.log("session init validate.");
            const id = results[0].id;
            const token = jwt.sign({ id }, process.env.JWT_SECRET, {
              expiresIn: process.env.JWT_EXPIRED_TIME,
            });
            // EXAMPLE TOKEN WITHOUT EXPIRED TIME:
            // const token = jwt.sign({id}, process.env.JWT_SECRET)
            const cookiesOptions = {
              // Basically, 1000 is used here just for converting seconds to milliseconds.
              expires: new Date(
                Date.now() +
                  process.env.JWT_COOKIE_EXPIRED * 24 * 60 * 60 * 1000
              ),
              httpOnly: true,
              signed: true,
              maxAge: 1000 * 60 * 1, // would expire after 15 minutes
              sameSite: false,
            };
            // Set a cookie:
            // res.cookie('cookie', 'monster')
            // Read a cookie:
            // req.cookies['cookie']
            // Node with express:
            // getCookieValue('cookieName', req.headers.cookie)
            // // Browser:
            // getCookieValue('cookieName', document.cookie)
            res.cookie("jwt", token, cookiesOptions);
            res.status(200).json({
              success: true,
              message: "Access into app success",
              params: {
                name: results[0]?.name,
                user: results[0]?.user,
                userId: results[0]?.id,
                token,
              },
            });
          }
        }
      );
    }
  } catch (e) {
    res.json({
      success: false,
      message: e,
    });
  }
};

exports.register = async (req, res) => {
  try {
    const name = req.body.name;
    const user = req.body.user;
    const password = req.body.password;
    const passHash = await bcryptjs.hash(password, 8);

    if (!user || !name || !password) {
      res.json({
        success: false,
        message: "Fields User, Name and Password are required",
      });
    } else {
      console.log(`User: ${name} for user: ${user}`);
      conection.query(
        `
        INSERT INTO
          users
        SET ?
      `,
        { user: user, name: name, passwd: passHash },
        (e, results) => {
          if (e) {
            res.json({
              success: false,
              message: "Error insert database!",
            });
          } else {
            res.json({
              success: true,
              message: "Save User Successfully",
            });
          }
        }
      );
    }
  } catch (e) {
    res.json({
      success: false,
      message: e,
    });
  }
};

exports.isAuthenticated = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );
      conection.query(
        `
        SELECT
          *
        FROM
          users
        WHERE
          1 = 1
          AND id = ?
          `,
        [decoded.id],
        (e, results) => {
          if (!results) {
            return next();
          }
          req.user = results[0];
          return next();
        }
      );
    } catch (error) {
      // console.log(error);
      return next();
    }
  } else {
    // res.redirect("home");
  }
};

exports.logout = async (req, res) => {
  res.clearCookie("jwt");
  res.json({
    success: true,
    message: "Token Remove and logout",
  });
};

exports.statusToken = async (req, res) => {
  if (req.signedCookies.jwt) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.signedCookies.jwt,
        process.env.JWT_SECRET
      );
      conection.query(
        `
        SELECT
          *
        FROM
          users
        WHERE
          1 = 1
          AND id = ?
        LIMIT 1
          `,
        [decoded.id],
        (e, results) => {
          if (results.length === 0) {
            res.status(200).json({
              success: true,
              status: false,
            });
          } else {
            res.status(200).json({
              success: true,
              status: true,
            });
          }
        }
      );
    } catch (error) {
      console.log("error");
      // return next();
    }
  } else {
    res.status(200).json({
      success: true,
      status: false,
    });
  }
};
