import React, {useContext, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers";
import {useSnackbar} from "notistack";
import {TextField} from "@material-ui/core";
import * as _ from "lodash";
import {isEmpty} from "lodash";
import {ErrorMessage} from "@hookform/error-message";
import {buildUserSchema} from "../../common/validators";
import {LoginContext} from "../../contexts/login.context";
import {signUp} from "../../services/auth.service";

export function SignUpForm(props) {
  const {onSubmit} = props;

  const [user, setUser] = useState({});
  const {enqueueSnackbar} = useSnackbar();
  const {signIn} = useContext(LoginContext);
  const [confirm, setConfirm] = useState("");

  const methods = useForm({
    resolver: yupResolver(buildUserSchema())
  });
  const watchConfirm = methods.watch("confirm");

  async function handleInsert(user) {
    await signUp(user);
    enqueueSnackbar("Usuário cadastrado com sucesso!", {variant: "success"});
  }

  function hasConfirmedPassword(user) {
    const confirmed = isPasswordConfirmed(user.password, watchConfirm);
    if (!confirmed) {
      methods.setError("confirm", {
        type: "manual",
        message: "As senhas devem ser iguais"
      })
    }
    return confirmed;
  }

  async function handleSave() {
    if (hasConfirmedPassword(user)) {
      try {
        await handleInsert(user);
      } catch (e) {
        enqueueSnackbar("Não foi possível cadastrar", {variant: "error"});
      }

      await signIn({
        email: user.email,
        password: user.password
      });
      onSubmit();
    }
  }

  const handleChangePassword = event => {
    const value = event.target.value;
    validate(value, confirm);

    setUser({...user, password: value});
  };

  const handleChangeConfirm = event => {
    const value = event.target.value;
    setConfirm(value);
    validate(user.password, value);
  };

  const handleChange = event => {
    const newState = {...user};
    _.set(newState, event.target.name, event.target.value);
    setUser(newState);
  };

  function isPasswordConfirmed(password, confirm) {
    return password === confirm || (isEmpty(password) && isEmpty(confirm));
  }

  const validate = (password, confirm) => {
    const fieldName = "confirm";
    if (isPasswordConfirmed(password, confirm)) {
      methods.clearErrors(fieldName);
    } else {
      methods.setError(fieldName, {
        type: "manual",
        message: "As senhas devem ser iguais"
      });
    }
  }

  return <FormProvider {...methods}>
    <form
      id="signup-form"
      autoComplete="off"
      noValidate
      onSubmit={methods.handleSubmit(handleSave)}
    >
      <TextField
        fullWidth
        label="Nome"
        margin="dense"
        name="name"
        inputRef={methods.register}
        onChange={handleChange}
        required
        value={user?.name}
        variant="outlined"
      />
      <ErrorMessage errors={methods.errors} name="name"/>
      <TextField
        fullWidth
        label="Email"
        margin="dense"
        name="email"
        inputRef={methods.register}
        onChange={handleChange}
        required
        value={user?.email}
        variant="outlined"
      />
      <ErrorMessage errors={methods.errors} name="email"/>
      <TextField
        fullWidth
        label="Senha"
        name="password"
        inputRef={methods.register}
        required
        margin="dense"
        onChange={handleChangePassword}
        type="password"
        variant="outlined"
      />
      <ErrorMessage errors={methods.errors} name="password"/>
      <TextField
        fullWidth
        label="Confirme a senha"
        name="confirm"
        inputRef={methods.register}
        required
        margin="dense"
        onChange={handleChangeConfirm}
        type="password"
        variant="outlined"
      />
      <ErrorMessage errors={methods.errors} name="confirm"/>
    </form>
  </FormProvider>
}
