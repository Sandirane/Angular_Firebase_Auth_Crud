import { RouterLink, RouterOutlet } from "@angular/router"
import { AuthStateService } from "../data-access/auth-state.service"
import { CommonModule } from "@angular/common"
import { Component } from "@angular/core"

@Component({
    selector: 'app-layout',
    standalone: true,
    imports: [CommonModule, RouterOutlet, RouterLink],
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.css'
})

export default class LayoutCompoent {
    constructor(public authStateService: AuthStateService) { }
} 