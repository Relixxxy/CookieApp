﻿namespace CookieData.Model
{
    public class ClickUpgradeModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public long BasePrice { get; set; }
        public double BaseValue { get; set; }
        public long Level { get; set; }
        public string Image { get; set; } = null!;
        public int GameAccountId { get; set; }
        public int UpgradeInfoId { get; set; }
    }
}
