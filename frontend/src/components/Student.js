import React, { useEffect, useState } from 'react';
import Form from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/system';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

export default function Student() {
  const paperStyle = { padding: '50px 20px', width: 800, margin: '20px auto' };
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [students, setStudents] = useState([]);

  const handleClick = (e) => {
    e.preventDefault();
    const student = { name, address };
    fetch('http://localhost:8080/student/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student),
    }).then(() => {
      console.log('New Student Added');
    });
  };

  useEffect(() => {
    fetch('http://localhost:8080/student/getAll')
      .then((res) => res.json())
      .then((result) => {
        setStudents(result);
      });
  }, []);
  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1 style={{ color: 'green' }}>Add Student</h1>
        <Form
          component='form'
          sx={{
            '& > :not(style)': { m: 1, width: '100%' },
          }}
          noValidate
          autoComplete='off'
        >
          <TextField
            id='outlined-basic'
            label='Student Name'
            variant='outlined'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='my-component'
            fullWidth
          />
          <TextField
            id='outlined-basic'
            label='Student Address '
            variant='outlined'
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className='my-component'
          />
          <Button variant='contained' onClick={handleClick}>
            Submit
          </Button>
        </Form>
      </Paper>
      <h2>Student List</h2>
      <Paper elevation={3} style={paperStyle}>
        {students.map((student) => (
          <Paper
            elevation={6}
            style={{ margin: '10px', padding: '15px', textAlign: 'left' }}
            key={student.id}
          >
            Id: {student.id}
            <br />
            Name: {student.name}
            <br />
            Address: {student.address}
          </Paper>
        ))}
      </Paper>
    </Container>
  );
}
