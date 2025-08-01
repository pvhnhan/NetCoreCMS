using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;

namespace CMS.Common.Utilities;

/// <summary>
/// Utility class để hash và verify password
/// </summary>
public class PasswordHasher
{
    private const int SaltSize = 16;
    private const int HashSize = 32;
    private const int Iterations = 10000;

    /// <summary>
    /// Hash password với salt
    /// </summary>
    /// <param name="password">Password cần hash</param>
    /// <returns>Password đã hash</returns>
    public string HashPassword(string password)
    {
        using var rng = RandomNumberGenerator.Create();
        var salt = new byte[SaltSize];
        rng.GetBytes(salt);

        using var pbkdf2 = new Rfc2898DeriveBytes(password, salt, Iterations, HashAlgorithmName.SHA256);
        var hash = pbkdf2.GetBytes(HashSize);

        var hashBytes = new byte[SaltSize + HashSize];
        Array.Copy(salt, 0, hashBytes, 0, SaltSize);
        Array.Copy(hash, 0, hashBytes, SaltSize, HashSize);

        return Convert.ToBase64String(hashBytes);
    }

    /// <summary>
    /// Verify password với hash
    /// </summary>
    /// <param name="password">Password cần verify</param>
    /// <param name="hashedPassword">Password đã hash</param>
    /// <returns>True nếu password đúng</returns>
    public bool VerifyPassword(string password, string hashedPassword)
    {
        try
        {
            var hashBytes = Convert.FromBase64String(hashedPassword);

            var salt = new byte[SaltSize];
            Array.Copy(hashBytes, 0, salt, 0, SaltSize);

            using var pbkdf2 = new Rfc2898DeriveBytes(password, salt, Iterations, HashAlgorithmName.SHA256);
            var hash = pbkdf2.GetBytes(HashSize);

            for (var i = 0; i < HashSize; i++)
            {
                if (hashBytes[i + SaltSize] != hash[i])
                    return false;
            }
            return true;
        }
        catch
        {
            return false;
        }
    }

    /// <summary>
    /// Kiểm tra độ mạnh của password
    /// </summary>
    /// <param name="password">Password cần kiểm tra</param>
    /// <returns>True nếu password đủ mạnh</returns>
    public bool IsPasswordStrong(string password)
    {
        if (string.IsNullOrEmpty(password) || password.Length < 8)
            return false;

        // Kiểm tra có ít nhất 1 chữ hoa
        if (!password.Any(char.IsUpper))
            return false;

        // Kiểm tra có ít nhất 1 chữ thường
        if (!password.Any(char.IsLower))
            return false;

        // Kiểm tra có ít nhất 1 số
        if (!password.Any(char.IsDigit))
            return false;

        // Kiểm tra có ít nhất 1 ký tự đặc biệt
        var specialChars = @"!@#$%^&*()_+-=[]{}|;:,.<>?";
        if (!password.Any(c => specialChars.Contains(c)))
            return false;

        return true;
    }
} 