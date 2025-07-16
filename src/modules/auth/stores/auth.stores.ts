import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { AuthStatus } from '../interfaces/auth-status.enum';
import type { User } from '../interfaces';
import { checkAuthAction, loginActions, registerAction } from '../actions';
import { useLocalStorage } from '@vueuse/core';

export const useAuthStores = defineStore('auth', () => {
  const authStatus = ref<AuthStatus>(AuthStatus.Checking);
  const user = ref<User | undefined>();
  const token= ref(useLocalStorage('token',''));

  const login = async (email:string, password:string)=>{
    try{
      const loginResp = await loginActions(email,password);
      if(!loginResp.ok){
        logout();
        return false
      };
    
    user.value = loginResp.user;
    token.value= loginResp.token;
    authStatus.value = AuthStatus.Authenticated;
    return true;
    }catch(error){ return logout()}
  };

  const logout = ()=>{
    localStorage.removeItem('token')
    authStatus.value = AuthStatus.Unautenthicated;
      user.value = undefined;
      token.value = '';
      return false
  }

  const register = async(fullName:string, email:string, password:string)=>{
    try{
      const registerRes = await registerAction(fullName,email,password);
      if(!registerRes.ok){
        logout();
        return {ok:false, message: registerRes.message}
      }
      user.value=registerRes.user;
      token.value=registerRes.token;
      authStatus.value=AuthStatus.Unautenthicated
      return{ok:true, message:''}

    }catch (error){
      return{ok:false, message:'Error al registrar al usuario'}
    }
  };

  const checkAuthStatus = async ():Promise<boolean>=>{
    try{
      const statusResp = await checkAuthAction();
      if(!statusResp.ok){
        logout();
        return false;
      }

      authStatus.value= AuthStatus.Authenticated;
      user.value=statusResp.user;
      token.value=statusResp.token;
      return true;

    }catch(error){
      logout();
      return false;
    }

  }
  

  return { 
    user,
    token,
    authStatus,

    //getters
    isAdmin:computed(()=>user.value?.roles.includes('admin') ?? false),
    isChecking: computed(()=>authStatus.value === AuthStatus.Checking),
    isAuthenticated: computed(()=>authStatus.value === AuthStatus.Authenticated),
    userName: computed(()=>user.value?.fullName),
    login,
    register,
    logout,
    checkAuthStatus,
  };
});
