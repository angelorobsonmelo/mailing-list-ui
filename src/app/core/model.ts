export class JwtAuthentication {
    email: string;
    password: string;
}

export class Category {
    id: number;
    category: string;
}

export class Function {
    id: number;
    category: string;
}

export class UserApp {
    email: string;
    firstName: string;
    lastName: string;
}

export class Contact {
    id: number;
    userNameInstagram: string;
    category: Category;
    functions: Function [];
    gender: string;
    registrationDate: Date
}

export class ContactSave {
    userNameInstagram: string;
    categoryId: number;
    functionsIds: number [];
    gender: string;
    registrationDate: Date
    userAppId: number;
}