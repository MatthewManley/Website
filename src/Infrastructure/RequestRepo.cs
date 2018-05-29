using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using Domain.Settings;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Primitives;
using MySql.Data.MySqlClient;

namespace Infrastructure
{
    public class RequestRepo : IRequestRepo
    {
        private readonly AppSettings _appSettings;

        public RequestRepo(IOptions<AppSettings> options)
        {
            _appSettings = options.Value;
        }

        public async Task Insert(string ip, string referrer, string useragent, DateTime time,
            CancellationToken cancellationToken)
        {
            const string cmd = "INSERT INTO Requests (XForwardedFor, Referrer, UserAgent, Time) VALUES (@ip, @referrer, @useragent, @time);";
            using (var connection = new MySqlConnection(_appSettings.ConnectionString))
            using (var command = new MySqlCommand(cmd, connection))
            {
                command.Parameters.AddWithValue("@ip", ip);
                command.Parameters.AddWithValue("@referrer", referrer);
                command.Parameters.AddWithValue("@useragent", useragent);
                command.Parameters.AddWithValue("@time", time);
                await connection.OpenAsync(cancellationToken);
                var thing = await command.ExecuteNonQueryAsync(cancellationToken);
            }
        }

        public async Task Insert(string ip, string referrer, string useragent, DateTime time)
        {
            await Insert(ip, referrer, useragent, time, CancellationToken.None);
        }
    }
}
