﻿using AutoMapper;
using CookieData.Entities;
using CookieData.Model;

namespace CookieData.Mapper
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<UserModel, User>()
                .ForMember(u => u.Email, opt => opt.MapFrom(um => um.Email))
                .ForMember(u => u.Login, opt => opt.MapFrom(um => um.Login))
                .ForMember(u => u.Password, opt => opt.MapFrom(um => um.Password))
                .ForMember(u => u.Id, opt => opt.Ignore());

            CreateMap<User, AuthenticateResponse>()
                .ForMember(ar => ar.Email, opt => opt.MapFrom(u => u.Email))
                .ForMember(ar => ar.Login, opt => opt.MapFrom(u => u.Login))
                .ForMember(ar => ar.Id, opt => opt.MapFrom(u => u.Id))
                .ForMember(ar => ar.Token, opt => opt.Ignore());
        }
    }
}