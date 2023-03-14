package com.sawmon.StudentSystem.controller;
import com.sawmon.StudentSystem.model.Student;
import com.sawmon.StudentSystem.service.StudentService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/student")
@CrossOrigin
public class StudentController {
    @Autowired
    private StudentService StudentService;


    @PostMapping("/add")
    public String add(@RequestBody Student student){
        StudentService.saveStudent(student);
        return "New Student is added";
    }
    
    @GetMapping("/getAll")
    public  List<Student> getAllStudents(){
        return StudentService.getAllStudents();
    }
}
