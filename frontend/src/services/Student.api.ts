import { IStudentApiRes } from "@/api-responses";
import { IStudent } from "@/models";
import lmsApi from "./lmsApi";

const API_URL = '/student';

export const getStudentList = () => {
	return lmsApi.get<IStudentApiRes[]>(`${API_URL}/getAll`);
};

export const createStudent = (data: IStudent) => {
  return lmsApi.post<IStudent>(`${API_URL}/add`, data);
};
