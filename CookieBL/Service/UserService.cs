﻿using AutoMapper;
using CookieBL.Helper;
using CookieBL.IRepository.Interfaces;
using CookieBL.Service.Interfaces;
using CookieData.Entities;
using CookieData.Model;
using Microsoft.Extensions.Configuration;

namespace CookieBL.Service
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _usersRepository;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;

        public UserService(IUserRepository usersRepository, IConfiguration configuration, IMapper mapper)
        {
            _usersRepository = usersRepository;
            _configuration = configuration;
            _mapper = mapper;
        }

        public async Task<AuthenticateResponse> AuthenticateAsync(AuthenticateRequest model)
        {
            var user = await _usersRepository.GetUserByCredentialsAsync(model.Login, model.Password);

            if (user is null)
            {
                // todo: need to add logger
                return null;
            }

            var token = _configuration.GenerateJwtToken(user);

            return new AuthenticateResponse(user, token);
        }

        public async Task<AuthenticateResponse> RegisterAsync(UserModel userModel)
        {
            var user = _mapper.Map<User>(userModel);

            user.GameAccount = AccountCreator.CreateGameAccount();

            await _usersRepository.AddUserAsync(user);

            var response = await AuthenticateAsync(new AuthenticateRequest
            {
                Login = user.Login,
                Password = user.Password
            });

            return response;
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            return await _usersRepository.GetAllUsersAsync();
        }

        public async Task<User> GetByIdAsync(int id)
        {
            return await _usersRepository.GetUserByIdAsync(id);
        }
    }
}