import { z } from 'zod';
export const CreateArticleSchema = z.object({
    title: z.string({
        required_error: "Title is required", // Shows if field is missing
    })
    .min(2, "Title must be at least 2 characters").max(20,"Max Length is 20 char"), // Additional validation

    body: z.string({
        required_error: "Body is required",
    })
    .min(10, "Body must be at least 10 characters"),
});


export const UpdateArticleSchema = z.object({
    title: z.string().min(1, "Title cannot be empty").optional(),
    body: z.string().min(1, "Body cannot be empty").optional(),
  }).refine(data => data.title !== undefined || data.body !== undefined, {
    message: "At least one field (title or body) must be provided",
  });



  const passwordValidation = z.string({
    required_error: "Password is required",
  })
  .min(6, "Password must be at least 6 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character");

export const CreateUserSchema = z.object({
  username: z.string({
    required_error: "Username is required",
  })
    .min(2, "Username must be at least 2 characters")
    .max(30, "Username cannot exceed 30 characters"),
    
  
  email: z.string({
    required_error: "Email is required",
  })
    .email("Please provide a valid email address"),
  
  password: passwordValidation
}).strict();


export const CreateUserFromAdminSchema = z.object({
  username: z.string({
    required_error: "Username is required",
  })
    .min(2, "Username must be at least 2 characters")
    .max(30, "Username cannot exceed 30 characters"),
    isAdmin: z.boolean().default(false).optional(),
  
  email: z.string({
    required_error: "Email is required",
  })
    .email("Please provide a valid email address"),
  
  password: passwordValidation
}).strict();



export const UpdateUserSchema = z.object({
    username: z.string()
      .min(2, "Username must be at least 2 characters")
      .max(30, "Username cannot exceed 30 characters")
      .optional(),
    
    email: z.string()
      .email("Please provide a valid email address")
      .optional(),
    
    password: passwordValidation.optional(),
    
    image: z.string()
      .optional(),  // Can be empty string or image URL
    
    isAdmin: z.boolean()
      .optional()
  })
  .strict()
  .refine(data => {
    return Object.keys(data).length > 0;
  }, {
    message: "At least one field must be provided for update",
    path: ["username", "email", "password", "image", "isAdmin"]  // All possible fields
  });




  export const LoginSchema = z.object({
    email: z.string({
      required_error: "Email is required",
    })
      .email("Please provide a valid email address"),
    
    password: passwordValidation
  }).strict();


  export const CreateCommentSchema = z.object({


    body: z.string({
        required_error: "Body is required",
    })
    .min(1, "Body must be at least 1 characters"),
    articleId:z.number({
      required_error: "Body is required",
      invalid_type_error:"Must be number"
    })
});

export const UpdateCommentSchema = z.object({
  body: z.string({
      required_error: "Body is required",
  })
  .min(1, "Body must be at least 1 characters")
  .optional(),
 
  
}).refine(data => data.body, {
  message: "At least one field must be provided for update",
  path: ["body"]
});