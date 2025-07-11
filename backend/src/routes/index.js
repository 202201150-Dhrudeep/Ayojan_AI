const express = require('express');
const router = express.Router();
const { getHomePage } = require('../controllers/index');
const { GoogleGenAI } =require( "@google/genai");
require('dotenv').config();

const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});
// Define route
router.get('/', getHomePage);
router.post('/generate-plan',async (req,res)=>{
    console.log("Received request to generate plan");
   try{ 
    let prompt = req.body.string
    // let string=' details event titled"'+req.body.title+"start date"+req.body.startDate+
    // "end date"+req.body.endDate+"location"+req.body.location+"budget"+req.body.budget+
    // "other additional details are given below: "+prompt+"now collaborate with google maps and   find 10 places fixing the description: wedding halls near "
    // +req.body.location+" and around the budget of "+req.body.budget+" and suggest 10 venues with their names, addresses, contact numbers, and a brief description of each venue and sort them based on google map ratings as well. if possible give the latitudes and longitudes of the halls and keep informtaion to the point";
     let response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
    contents: prompt,
    });
    // console.log("Prompt sent to AI:", string);
    // let response="";
    // console.log(response.candidates[0].content);
    res.json({
        message: "Plan generated successfully",
        full:response,
        plan: response.candidates[0].content,
        ideas: response.candidates[0].ideas || []
    });}
    catch(err)
    {
        console.error("Error generating plan:", err);
        res.status(500).json({
            message: "❌ Failed to generate plan. Please try again.",
            plan: "",
            ideas: []
        });
    }
})

module.exports = () => router;
