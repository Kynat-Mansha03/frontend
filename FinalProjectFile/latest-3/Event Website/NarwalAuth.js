//const fetch = require("node-fetch");
// import crypto from 'crypto';
// const express = require("express");
// const bodyParser = require("body-parser");
// in place of unique entity add any entity unique to the password, like an email or uniqueentity, it needs to be a string
async function NarwalAuth()  {
  async function generatePublicKey(password, uniqueentity) {
    const x = await hashFunction(password, uniqueentity);
    const g = BigInt(2);
    const primenumber =
      "4074071952668972172536891376818756322102936787331872501272280898708762599526673412366794779";
    const modulus = BigInt(primenumber);
    const Y = Exponent(g, x, modulus);
    return Y.toString();
  }

  async function hashFunction(password, uniqueentity) {
    const pepper = password + uniqueentity;
    const msgUint8 = new TextEncoder().encode(pepper);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return BigInt("0x" + hashHex);
  }

function Exponent(g, x, mod) {
    if (mod === 1n) return 0n;
    let crypted = 1n;
    g = g % mod;
    while (x > 0n) {
      if (x % 2n === 1n) {
        crypted = (crypted * g) % mod;
      }
      x = x / 2n;
      g = (g * g) % mod;
    }
    return crypted;
  }
//used at the log in endpoint
  async function solveChallenge(uniqueentity, password, challenge) {
    const g = BigInt(2);
    const r = BigInt(Math.floor(Math.random() * 1000));
    const Y = await generatePublicKey(password, uniqueentity);
    const T = g.toString();
    const a = BigInt(challenge);

    const hashedPassword = await hashFunction(password, "");
    const x = hashedPassword;

    const hashConcatenation = `${Y}${T}${a}`;
    // const c = crypto
    //   .createHash("sha256")
    //   .update(hashConcatenation)
    //   .digest("hex");
    const msgUint8= new TextEncoder().encode(hashConcatenation);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); 
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const c=hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    var z = r - BigInt("0x" + c) * x;
    if (z < 0) {
      z = z * -1n;
  }
    const solution = {
    // uniqueentity: uniqueentity,
      //  challenge: challenge,
      c: c,
      z: z,
      isValid: true,
    };

    return solution;
  }
return {
  GetPublicKey: async function(password, uniqueentity) {
    return await generatePublicKey(password, uniqueentity);
  },
  SolveChallenge: async function(uniqueentity, password, challenge) {
    return await solveChallenge(uniqueentity, password, challenge);
  },
};

  // async receiveResultFromServer() {
  //   // Example of receiving result from the server, using fetch or Axios for HTTP requests
  //   const url = "https://example.com/api/getresult"; // Replace with your server's endpoint

  //   try {
  //     const response = await fetch(url);

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     const result = await response.json();
  //     console.log("Received result from server:", result);
  //     // Process the result received from the server here
  //     return result;
  //   } catch (error) {
  //     console.error("Error receiving result from server:", error.message);
  //     // Handle errors appropriately
  //     return null;
  //   }
  // },

  // async receiveChallengeFromServer() {
  //   const url = "http://localhost:3000/get-challenge"; // Replace with your server endpoint

  //   try {
  //     const response = await fetch(url);
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     const challenge = await response.json();
  //     console.log("Received challenge from server:", challenge);
  //     return challenge;
  //   } catch (error) {
  //     console.error("Error receiving challenge from server:", error);
  //   }
  // },

  // async sendSolutionToServer(uniqueentity, solution) {
  //   const url = "https://example.com/api/sendSolution"; // Replace with your server's endpoint

  //   try {
  //     const response = await fetch(url, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ uniqueentity, solution }),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     const responseData = await response.json();
  //     console.log("Response from server:", responseData);
  //     // Process the response from the server here
  //   } catch (error) {
  //     console.error("Error sending solution to server:", error.message);
  //     // Handle errors appropriately
  //   }
  // },

  // async sendUpToServer(uniqueentity, publickey) {
  //   // Example of sending data to the server, using fetch or Axios for HTTP requests
  //   const url = "https://example.com/api/senduserdata"; // Replace with your server's endpoint

  //   try {
  //     const response = await fetch(url, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ uniqueentity, publickey }),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     const responseData = await response.json();
  //     console.log("Response from server:", responseData);
  //     // Process the response from the server here
  //   } catch (error) {
  //     console.error("Error sending data to server:", error.message);
  //     // Handle errors appropriately
  //   }
  // },
}

// Example usage

// const password = "password123";
// const uniqueentity = "lillbytes";
// const publicKey = await NarwalAuthFunctions.generatePublicKey(
//   password,
//   uniqueentity
// );
// console.log("Public Key:", publicKey);
// await NarwalAuthFunctions.sendUpToServer(uniqueentity, publickey);

// const challenge = await NarwalAuthFunctions.receiveChallengeFromServer();
// const solution = await NarwalAuthFunctions.solveChallenge(
//   uniqueentity,
//   password,
//   challenge
// );
// await NarwalAuthFunctions.sendSolutionToServer(uniqueentity, solution);
// result = NarwalAuthFunctions.receiveResultFromServer();
// if (result == true) {
//   console.log("Login successful");
// } else {
//   console.log("Login failed");
// }
export default NarwalAuth;
