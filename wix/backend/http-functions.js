/*************************
backend/http-functions.js
 *************************

 In this file you create APIs to expose the functionality of your package as a service. 
 Sites in which that package is installed in can use  the functionality of your package by writing code that calls your packages's APIs, as defined by the functions you create here.
 Using the provided code (below this comment block) as an example, users of your HTTP functions can call your API using the following patterns: 


 Production endpoints:  

• Premium site:
  https://mysite.com/rest-api/v1/functions/packages/<package-name>/multiply?leftOperand=3&rightOperand=4  

• Free sites:
  https://username.wixsite.com/mysite/rest-api/v1/functions/packages/<package-name>/multiply?leftOperand=3&rightOperand=4
 
 About HTTP functions:
 https://support.wix.com/en/article/velo-exposing-a-site-api-with-http-functions

 API Reference: 
 https://www.wix.com/velo/reference/wix-http-functions
 
**********************/

import {getSecret} from 'wix-secrets-backend';
import { ok, badRequest, notFound } from 'wix-http-functions';

// Used to verify that the request contains 
// a valid API key in path 0.
async function verify(request){
  const API_Key = await getSecret("API_Key");
  try {
     const key = request.path[0]; 
     return (key === API_Key);
   }
   catch(err){
     return false;
   }
}

export async function get_hello(request) {
   const response = {
       "headers": {
           "Content-Type": "application/json"
       },
       "body": ""
   };

   if(await verify(request)){
      response.body = "Hello. You are valid!";
      return ok(response);
   }
   else {
     response.body = "Hello. You are NOT valid!";
     return badRequest(response);
   }
}

import wixData from 'wix-data';

export async function get_services(request){
   const response = {
       "headers": {
           "Content-Type": "application/json"
       },
       "body": ""
   };

   if(await verify(request)){
     await wixData.query('Bookings/Services')
       .find()
       .then( (results) => {
         if(results.items.length > 0) {
            let firstItem = results.items[0]; 
            response.body = firstItem;               
          } 
          else {
            response.body = "EMPTY!";
          }
        }).catch(err => console.log(err))

     return ok(response);
   }
   return badRequest(response);
}


/**
 * Exposes endpoint for fetching instructor names. 
 * Requires API-key auth.
 */
export async function get_instructors(request){
  const response = {
       "headers": {
           "Content-Type": "application/json"
       },
       "body": ""
   };

  if(await verify(request)){
     return wixData.query('Members/PublicData')
       .find()
       .then( (results) => {

         const pruned = results.items
            // Change nickname to name
            .map( (obj) => {
                 obj.name = obj.nickname;
                 return obj;
            })
            // Prune not needed data to minimize internal data accessible.
            .map( (obj) => ( ({ name }) => ({ name }) )(obj));
         response.body = JSON.stringify(pruned);

         return ok(response);
        }).catch(err => {
          console.log(err);

          // We do not want to respond with error because of security
          response.body = "Query error";  

          return serverError(response);
        });
   }
   else {

      response.body = "Invalid API key";

      return badRequest(response);
   }
}

