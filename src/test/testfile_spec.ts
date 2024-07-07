import "mocha";
//import chai, { expect } from "chai";
import axios from "axios";
import AuthenticationService from "./../authentication/authentication.service";

const authservice = new AuthenticationService();

// describe("Users", () => {
//   describe("/GET /users", () => {
//     it("it should return an array of user objects", async () => {
//       const response = await axios.get("http://localhost:5000/users");

//       expect(response.status).to.be.equal(200);
//       expect(response.data).to.be.an("array");
//     });
//   });

//   describe("/POST /auth/register", () => {
//     it("it should return an object representing a successfully registered user", async () => {
//       const payload = {
//         name: "Kennie",
//         email: "llarss30@email.com",
//         password: "hdjdkkddkkd",
//         confirmPassword: "hdjdkkddkkd",
//       };
//       const response = await axios.post(
//         "http://localhost:5000/auth/register",
//         payload
//       );

//       expect(response.status).to.be.equal(200);
//       expect(response.data).to.have.property("name");
//     });
//   });

//   describe("/POST /auth/register", () => {
//     it("it should return a duplicate email error", async () => {
//       const payload = {
//         name: "Kennie",
//         email: "larss@email.com",
//         password: "hdjdkkddkkd",
//         confirmPassword: "hdjdkkddkkd",
//       };
//       try {
//         const response = await axios.post(
//           "http://localhost:5000/auth/register",
//           payload
//         );

//         expect(response.status).not.to.be.equal(200);
//       } catch (error) {
//         if (error.response) {
//           expect(error.response.status).not.to.be.equal(200);
//         } else {
//           throw error;
//         }
//       }
//     });
//   });

//   describe("Create Token", () => {
//     it("it should return an object with property token", async () => {
//       //const response = await axios.get("http://localhost:5000/users");
//       const payload = {
//         name: "Kennie",
//         email: "larss@email.com",
//         password: "hdjdkkddkkd",
//         confirmPassword: "hdjdkkddkkd",
//       };
//       const response = authservice.createToken(payload);
//       expect(response).to.have.property("expiresIn");
//       expect(response).to.have.property("token");
//     });
//   });
// });
