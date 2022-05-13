this.http.get<IUser>(url,{params: sendParams}).subscribe({
    next(res){
      const user = res.user[0]
      const status = user.durum
      const message = user.mesaj
      console.log(status, message)
      if (status) {
        //giriş başarılı
        mythis.toast.success(
          message, 'User Login'

        )
        //Session Storage'a kullanıcı bilgilerini sakla
        const userData = user.bilgiler;
         if(userData){
           const stringUserData = JSON.stringify(userData);
           sessionStorage.setItem('user', encrypt(stringUserData))
          //remember ->true
           if(remember === true){
            localStorage.setItem('user', encrypt(stringUserData))
          }
           mythis.router.navigate(['/admin'])
         }
      }
      else{
        //giriş başarısız
        mythis.toast.error(
          message, 'User Login'
        )
      }
    },
    error(err){
      console.log(err.message)
    }
  })