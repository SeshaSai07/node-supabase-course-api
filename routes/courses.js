const express = require('express');
const router = express.Router();
const supabase = require('../supabaseClient.js');
// const validateCourse = require('../middleware/validateCourse.js');
const validateEnrollment = require('../middleware/validateEnrollment.js');

router.get("/courses", async (req, res)=> {
        const { data, error } = await supabase
            .from("courses")
            .select("*");
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.json(data)
    });

router.post("/enroll", validateEnrollment, async (req, res,) => {
    try {
        const { student_name, course_id } = req.body;
        const { data, error } = await supabase
            .from("enrollments")
            .insert([{ student_name, course_id }])
            .select();

            if (error) {
                return res.status(500).json({ error: err.message });
            }

    
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
});

/*router.post("/courses", async (req, res) => {
    try {
        const { title, instructor } = req.body;
        if (!title || !instructor) {
            return res.status(400).json({
                error: "title and instructor are required",
            });
        }
        const { data, error } = await supabase
            .from("courses")
            .insert([{ title, instructor }])
            .select();

        if (error) throw error;
        res.status(201).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
});*/

router.get("/courses/:id/enrollments", async(req, res) => {
    try {
        const courseId = req.params.id;
        const { data, error } = await supabase
            .from("enrollments")
            .select("student_name , course_id")
            .eq("course_id", courseId);
        if (error) throw error;

        res.json(data);
        
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
});
module.exports = router;