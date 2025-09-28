const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent } = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
    // Get query parameters for filtering
    const { name, className, section, roll } = req.query;
    
    // Call service to get all students with filters
    const students = await getAllStudents({ name, className, section, roll });
    
    // Return students list
    res.json({ students });
});

const handleAddStudent = asyncHandler(async (req, res) => {
    // Get student data from request body
    const studentData = req.body;
    
    // Call service to add new student
    const result = await addNewStudent(studentData);
    
    // Return success message
    res.json(result);
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
    // Get student ID from params and data from body
    const { id } = req.params;
    const studentData = req.body;
    
    // Add ID to the payload
    const payload = { ...studentData, id };
    
    // Call service to update student
    const result = await updateStudent(payload);
    
    // Return success message
    res.json(result);
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    // Get student ID from params
    const { id } = req.params;
    
    // Call service to get student detail
    const student = await getStudentDetail(id);
    
    // Return student detail
    res.json(student);
});

const handleStudentStatus = asyncHandler(async (req, res) => {
    // Get student ID from params
    const { id } = req.params;
    
    // Get status from body
    const { status } = req.body;
    
    // Get current user ID from authenticated user (reviewer)
    const { id: reviewerId } = req.user;
    
    // Call service to update student status
    const result = await setStudentStatus({ 
        userId: id, 
        reviewerId, 
        status 
    });
    
    // Return success message
    res.json(result);
});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
};
