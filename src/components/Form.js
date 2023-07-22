import React, { useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Box,
  Heading,
  Text,
} from '@chakra-ui/react';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/reducer/user';
import { useNavigate } from 'react-router-dom';
import { validation } from '../constants/constants';

export const Form = ({ users }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  // to set page reload data
  useEffect(()=>{
    const userInfo = JSON.parse(localStorage.getItem('userData'));
    if(userInfo){
      dispatch(setUserData(userInfo));
    }
  },[dispatch])
  const onSubmit = (data) => {
    const userData = users.filter((user) => user.email === data.username && user.phone === data.password);
    if (userData.length > 0) {
      toast.success(validation.login.success);
      dispatch(setUserData(userData)); 
      localStorage.setItem('userData',JSON.stringify(userData));
      navigate('/');
    } else {
      toast.error(validation.login.error);
    }
  };
  return (
    <Box
      maxW="md"
      mx="auto"
      mt={8}
      p={4}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
    >
      <Heading as="h2" textAlign="center" mb={4}>
        Login Form
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <FormControl id="username" isInvalid={errors.username}>
            <FormLabel>Username</FormLabel>
            <Controller
              name="username"
              control={control}
              defaultValue=""
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address',
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}  
                  type="text"
                  placeholder="Enter your username"
                  focusBorderColor="teal.500"
                />
              )}
            />
            {errors.username && (
              <Text color="red" fontSize="sm">
                {errors.username.message}
              </Text>
            )}
          </FormControl>

          <FormControl id="password" isInvalid={errors.password}>
            <FormLabel>Password</FormLabel>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: 'Password is required' }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="password"
                  placeholder="Enter your password"
                  focusBorderColor="teal.500"
                />
              )}
            />
            {errors.password && (
              <Text color="red" fontSize="sm">
                {errors.password.message}
              </Text>
            )}
          </FormControl>

          <Button type="submit" colorScheme="teal" size="lg" fontSize="md">
            Login
          </Button>
        </Stack>
      </form>

    </Box>
  )
}
