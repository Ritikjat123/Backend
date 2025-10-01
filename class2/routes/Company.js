const express=require("express");

const router=express.Rounter();

const {createCompany}=require("../controller/Company.js")

router.post("/create-company",createCompany)


const getDBConnection=require("./modals/company.js")

const Company=require("./routes/Company.js")

application.use("/api/v1/company",createCompany)