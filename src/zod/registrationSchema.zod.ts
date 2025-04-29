import z from "zod";
const registrationSchema = z.object({
    email:z.string().email().min(1,"Email is required"),
    password:z.string().min(6,"Password must be at least 6 characters long"),
    userName:z.string().min(1,"Username is required"),
})
export default registrationSchema;
export type RegisterUserType=z.infer<typeof registrationSchema>;