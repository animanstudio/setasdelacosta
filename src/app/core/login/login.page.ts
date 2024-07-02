import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: any;

  constructor(
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) { }

  async login(loginForm: NgForm) {
    if (loginForm.valid) {
      const { email, password } = loginForm.value;

      // Llama al método login del AuthService para autenticar al usuario
      const isAuthenticated = this.authService.login(email, password);

      if (isAuthenticated) {
        // Mostrar Toast de éxito
        this.presentToast('Inicio de sesión exitoso');

        // Simulación de inicio de sesión con una carga ficticia
        const loading = await this.loadingCtrl.create({
          message: 'Iniciando sesión...',
          duration: 2000 // Duración de carga ficticia (2 segundos)
        });
        await loading.present();

        // Aquí puedes realizar la lógica adicional después del inicio de sesión exitoso
        loading.dismiss();
        console.log(`Inicio de sesión exitoso: Bienvenido Email - ${email}, Contraseña - ${password}`);

        // Redireccionar a otra página después del inicio de sesión exitoso
        this.navCtrl.navigateRoot('/ventas');
      } else {
        // Mostrar Toast de error
        this.presentToast('Credenciales incorrectas. Inicio de sesión fallido', 'danger');
        console.log('Credenciales incorrectas. Inicio de sesión fallido.');
        // Puedes mostrar un mensaje de error o realizar otras acciones según sea necesario
      }
    }
  }

  async presentToast(message: string, color: string = 'success') {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'top'
    });
    toast.present();
  }

}
