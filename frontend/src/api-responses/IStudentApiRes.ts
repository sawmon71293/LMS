import { IStudent } from "@/models";

interface IStudentApiRes extends IStudent{
  id: string | number 
}

export default IStudentApiRes;