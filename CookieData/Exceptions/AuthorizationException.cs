﻿namespace CookieData.Exceptions
{
    public class AuthorizationException : Exception
    {
        public AuthorizationException(string mesasge)
            : base(mesasge)
        {
        }
    }
}
