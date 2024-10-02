import { FormControl } from "@angular/forms";

export interface FormSignIn {
    email: FormControl<string | null>,
    password: FormControl<string | null>
}
