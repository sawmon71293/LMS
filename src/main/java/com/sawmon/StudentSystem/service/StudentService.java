package com.sawmon.StudentSystem.service;

import java.util.List;

import com.sawmon.StudentSystem.model.Student;



public interface StudentService {
    public Student saveStudent(Student student);
    public List<Student> getAllStudents();
}
