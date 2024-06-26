import style from "../AuthDialog.module.scss";
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import {setCookie} from 'nookies';
import {LoginSchema} from "../../../utils/schemas/loginSchema";
import {LoginUserDto} from "../../../utils/api/types";
import {Api} from "../../../utils/api";
import {useAppDispatch} from "../../../redux/hooks";
import {setUserData} from "../../../redux/slices/user";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const AuthFormLogin = ({setForm,close}) => {
    const dispatch = useAppDispatch()
    const form = useForm({
        mode: 'onSubmit',
        resolver: yupResolver(LoginSchema)
    })

    const onSubmit = async (dto: LoginUserDto) => {
        try {
            const data = await Api().auth.login(dto)
            setCookie(null, 'journalToken', data.access_token, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/'
            })
            dispatch(setUserData(data))
            close()
        } catch (e) {
            console.log(e, 'error AuthFormLogin')
        }
    }
    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className={style.registration}>
                <div className={style.registrationFields}>
                    <TextField
                        {...form.register('email')}
                        error={!!form.formState.errors.email?.message}
                        helperText={form.formState.errors.email?.message}
                        variant='outlined'
                        fullWidth
                        placeholder='email'/>
                    <TextField
                        {...form.register('password')}
                        error={!!form.formState.errors.password?.message}
                        helperText={form.formState.errors.password?.message}
                        variant='outlined'
                        fullWidth
                        type={'password'}
                        placeholder='Пароль'/>
                </div>
                <div className={style.buttonWrapper}>
                    <Button variant='outlined' onClick={() => setForm('main')}>
                        Назад
                    </Button>
                    <Button type='submit' variant='contained' color='primary'>
                        Войти
                    </Button>
                </div>
            </div>
        </form>
    )
}