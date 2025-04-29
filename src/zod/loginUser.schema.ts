import z from "zod";
const loginUserSchema=z.object({
 email:z.string().email().min(1,"Email is Required"),
 password:z.string().min(1,'Password is Required')
});
export default loginUserSchema;
export type LoginUserType=z.infer<typeof loginUserSchema>