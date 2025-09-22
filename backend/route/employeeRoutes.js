const express = require("express");
const router = express.Router();
const employeeController = require("../controller/employeeController");
const upload = require("../middleware/upload");

//~crud operation routes 
router.post("/", upload.single("photo"), employeeController.createEmployee);
router.get("/", employeeController.getEmployees);
router.get("/:id", employeeController.getEmployeeById);
router.put("/:id", upload.single("photo"), employeeController.updateEmployee);
router.delete("/:id", employeeController.deleteEmployee);

module.exports = router;
