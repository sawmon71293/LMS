import React, { useState } from "react";
import Form from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/system";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { StudentApi } from "@/services";
import { IStudentApiRes } from "@/api-responses";
import { IStudent } from "@/models";
import useSWR from "swr";
import { Controller, useForm } from "react-hook-form";

const paperStyle = { padding: "50px 20px", width: 800, margin: "20px auto" };

export default function StudentList() {
	const {
		control,
		reset,
		handleSubmit,
		formState: { errors, isSubmitSuccessful },
	} = useForm<IStudent>({
		defaultValues: {
			name: "",
			address: "",
		},
	});

	const { data: students, mutate } = useSWR<IStudentApiRes[]>(
		"/student-list",
		async () => {
			const { data } = await StudentApi.getStudentList();
			return data;
		}
	);

	const addStudent = async ({ name, address }: IStudent) => {
		const student: IStudent = { name, address };
		try {
			await StudentApi.createStudent(student);
			mutate();
			reset();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container>
			<Paper elevation={3} style={paperStyle}>
				<h1 style={{ color: "green" }}>Add Student</h1>
				<Form
					component="form"
					sx={{
						"& > :not(style)": { m: 1, width: "100%" },
					}}
					noValidate
					autoComplete="off"
					onSubmit={handleSubmit(addStudent)}
				>
					<Controller
						name="name"
						control={control}
						rules={{ required: true }}
						render={({ field }) => (
							<TextField
								error={!!errors.name}
								id="outlined-basic"
								label="Student Name"
								variant="outlined"
								{...field}
								fullWidth
							/>
						)}
					/>
					<Controller
						name="address"
						control={control}
						rules={{ required: true }}
						render={({ field }) => (
							<TextField
								error={!!errors.address}
								id="outlined-basic"
								label="Student Address"
								variant="outlined"
								{...field}
								fullWidth
							/>
						)}
					/>
					<Button type="submit" variant="contained">
						Submit
					</Button>
				</Form>
			</Paper>
			<h2>Student List</h2>
			<Paper elevation={3} style={paperStyle}>
				{students?.map((student) => (
					<Paper
						elevation={6}
						style={{ margin: "10px", padding: "15px", textAlign: "left" }}
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
