<script>
    import CodeBlock from "$lib/components/CodeBlock.svelte";

</script>
<svelte:head>
    <title>SQL Manager</title>
    <link rel="icon" href="" type="image/x-icon" />
    <meta name="title" content="SQL Manager" />
    <meta
        name="description"
        content="A lightweight C# utility for interacting with MySQL databases, developed for a school project. Includes a custom class for handling SQL operations cleanly."
    />
    <meta name="author" content="WarperSan" />
    <meta
        name="keywords"
        content="SQL Manager, MySQL, Database, C#, School Project, SQL Utility, WarperSan, T-SQL, Server Communication"
    />
</svelte:head>

<article>
    <section>
        <h2>Story</h2>
        <p>
            For a school project, we had to create an app that communicates with
            a database
            <i>in my case, MySQL</i>. Since I didn't want to make something
            complex, I've made something even more complex. I made a class that
            helps with the communication with the server:
        </p>

        <CodeBlock lang="csharp">
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Runtime.CompilerServices;

namespace SQLManager
&lbrace;
    public class SQLManager
    &lbrace;
        private readonly SqlConnection _sqlConnection;
        private readonly Action&lt;string&gt; _loggerAction;

        private static readonly Type[] _SQLObjects;
        static SQLManager()
        &lbrace;
            List&lt;Type&gt; sqlObjects = new List&lt;Type&gt;(); // new();

            // https://stackoverflow.com/a/851287
            Assembly[] assemblies = AppDomain.CurrentDomain.GetAssemblies();

            foreach (var assembly in assemblies)
            &lbrace;
                // https://stackoverflow.com/a/1315668
                foreach (var @class in assembly.GetTypes())
                &lbrace;
                    // https://stackoverflow.com/a/11227373
                    if (!@class.UnderlyingSystemType.IsSubclassOf(typeof(SQLObject)))
                        continue;

                    // Found a SQLObject
                    SQLObjectAttribute sQLObjectAttribute = @class.GetCustomAttribute&lt;SQLObjectAttribute&gt;();

                    if (sQLObjectAttribute.IsNameValid())
                    &lbrace;
                        sqlObjects.Add(@class.UnderlyingSystemType);
                    &rbrace;
                    else
                        throw new Exception($"Class named \'&lbrace;@class.Name&rbrace;\' was found, but the attribute &lbrace;nameof(SQLObjectAttribute)&rbrace; has an invalid Name.");
                &rbrace;
            &rbrace;
            _SQLObjects = sqlObjects.ToArray();
        &rbrace;

        /// &lt;summary&gt;
        /// Connects the user to the database with the given ID and the given password
        /// &lt;/summary&gt;
        /// &lt;param name="id"&gt;ID of the account&lt;/param&gt;
        /// &lt;param name="password"&gt;Password of the account&lt;/param&gt;
        public SQLManager(string dataSourceName, string databaseName, string id, string password, Action&lt;string&gt; loggerAction)
        &lbrace;
            _sqlConnection = new SqlConnection($"Data source =&lbrace;dataSourceName&rbrace;; Initial Catalog =&lbrace;databaseName&rbrace;; User Id= &lbrace;id&rbrace;;password =&lbrace;password&rbrace;");

            _loggerAction = loggerAction;


            TryOpenConnection(caller: nameof(SQLManager));

            OnLog($"SQL Manager Object created on '&lbrace;dataSourceName&rbrace;' (&lbrace;databaseName&rbrace;) by '&lbrace;id&rbrace;'", nameof(SQLManager));
        &rbrace;

        enum CommandType
        &lbrace;
            Scalar,
            NonQuery,
            Reader
        &rbrace;

        /// &lt;summary&gt;
        /// Executes the given command with the correct method
        /// &lt;/summary&gt;
        /// &lt;typeparam name="T"&gt;Type of the expected value&lt;/typeparam&gt;
        /// &lt;param name="sqlCmd"&gt;Command to execute&lt;/param&gt;
        /// &lt;param name="type"&gt;Type of the command&lt;/param&gt;
        /// &lt;returns&gt;Value of the given command&lt;/returns&gt;
        private T ExecuteSQLCommand&lt;T&gt;(string sqlCmd, CommandType type, [CallerMemberName] string caller = "")
        &lbrace;
            if (_sqlConnection != null)
                return ExecCommand&lt;T&gt;(new SqlCommand(sqlCmd, _sqlConnection), type, caller);

            OnLog("SQL Connection is not defined.");
            return default;
        &rbrace;

        private T ExecCommand&lt;T&gt;(SqlCommand cmd, CommandType type, [CallerMemberName] string caller = "")
        &lbrace;
            OnLog($"Request to execute the command '&lbrace;cmd.CommandText&rbrace;' (&lbrace;type&rbrace;).", caller);

            try
            &lbrace;
                TryOpenConnection(true);

                object value = default;

                switch (type)
                &lbrace;
                    case CommandType.Scalar:
                        value = cmd.ExecuteScalar(); // First column of first row  (min, max, count, avg)
                        break;
                    case CommandType.NonQuery:
                        value = cmd.ExecuteNonQuery(); // DML Request (Update, insert, delete)
                        break;
                    case CommandType.Reader:
                        value = cmd.ExecuteReader(); // Table
                        break;
                    default:
                        throw new NotImplementedException();
                &rbrace;

                if (type != CommandType.Reader) // Needs to stay opened
                    TryCloseConnection(true);

                return (T)value;
            &rbrace;
            catch (Exception e)
            &lbrace;
                OnLog(e.Message);
            &rbrace;
            return default;
        &rbrace;

        // TODO: Make a single method that takes the command, checks if it's valid, then execute the correct commad type
        private T ExecuteScalarCommand&lt;T&gt;(string sqlCmd, [CallerMemberName] string caller = "")
            =&gt; ExecuteSQLCommand&lt;T&gt;(sqlCmd, CommandType.Scalar, caller);

        private SqlDataReader ExecuteReaderCommand(string sqlCmd, [CallerMemberName] string caller = "")
            =&gt; ExecuteSQLCommand&lt;SqlDataReader&gt;(sqlCmd, CommandType.Reader, caller);

        private int ExecuteNonQueryCommand(string sqlCmd, [CallerMemberName] string caller = "")
            =&gt; ExecuteSQLCommand&lt;int&gt;(sqlCmd, CommandType.NonQuery, caller);

        public object[] ExecuteStoredProcedure(string procName, Dictionary&lt;string, (object, ParameterDirection)&gt; parameters)
        &lbrace;
            object[] outputsValue = null;

            try
            &lbrace;
                SqlCommand cmdInsert = new SqlCommand(procName, _sqlConnection)
                &lbrace;
                    CommandType = System.Data.CommandType.StoredProcedure
                &rbrace;;

                var parms = parameters.ToArray();

                var outputs = new List&lt;SqlParameter&gt;();
                bool hasReturnValue = false;

                foreach (var item in parms)
                &lbrace;
                    var (value, dir) = item.Value;

                    var sqlParameter = new SqlParameter(item.Key.StartsWith("@") ? item.Key : $"@&lbrace;item.Key&rbrace;", value)
                    &lbrace;
                        Direction = dir
                    &rbrace;;

                    if (sqlParameter.Direction == ParameterDirection.ReturnValue)
                        hasReturnValue = true;

                    if (sqlParameter.Direction == ParameterDirection.Output || sqlParameter.Direction == ParameterDirection.ReturnValue)
                        outputs.Add(sqlParameter);
                    cmdInsert.Parameters.Add(sqlParameter);
                &rbrace;

                TryOpenConnection();

                OnLog($"Executing the stored procedure '&lbrace;procName&rbrace;'.");

                if (hasReturnValue)
                    cmdInsert.ExecuteScalar();
                else
                    cmdInsert.ExecuteNonQuery();

                TryCloseConnection();

                outputsValue = new object[outputs.Count];

                for (int i = 0; i &lt; outputs.Count; ++i)
                    outputsValue[i] = outputs[i].Value;
            &rbrace;
            catch (Exception e)
            &lbrace;
                OnLog(e.Message);
            &rbrace;
            TryCloseConnection();
            return outputsValue;
        &rbrace;

        public SqlDataReader ExecuteFunction(string funcName)
        &lbrace;
            return ExecuteReaderCommand($"SELECT * FROM &lbrace;funcName&rbrace;()");
        &rbrace;

        /// &lt;returns&gt;Value of the given column&lt;/returns&gt;
        public object GetValue(SqlDataReader reader, string[] headers, string propertyName, Type propertyType)
        &lbrace;
            try
            &lbrace;
                int index = Array.IndexOf(headers, propertyName);

                if (index == -1)
                &lbrace;
                    OnLog($"Column &lbrace;propertyName&rbrace; not found.");
                    return default;
                &rbrace;

                return reader.GetValue(index);
            &rbrace;
            catch (Exception e)
            &lbrace;
                OnLog(e.Message);
            &rbrace;
            return default;
        &rbrace;

        /// &lt;summary&gt;
        /// Gives the name of the SQL Object linked to the given class
        /// &lt;/summary&gt;
        /// &lt;returns&gt;Name of the SQL Object&lt;/returns&gt;
        public string GetTableName&lt;T&gt;()
        &lbrace;
            try
            &lbrace;
                int index = Array.IndexOf(_SQLObjects, typeof(T));

                if (index != -1)
                    return _SQLObjects[index].GetCustomAttribute&lt;SQLObjectAttribute&gt;().GetName();
            &rbrace;
            catch (Exception e)
            &lbrace;
                OnLog(e.Message);
                return null; // ERROR
            &rbrace;
            OnLog($"Type &lbrace;typeof(T)&rbrace; is not supported.");
            return null; // INVALID TYPE
        &rbrace;

        /// &lt;summary&gt;
        /// Loads all the object of the given class
        /// &lt;/summary&gt;
        /// &lt;remarks&gt;If the given class has&lt;/remarks&gt;
        public void LoadItems&lt;T&gt;(out List&lt;T&gt; loadedItems, bool sortItems = true) where T : SQLObject
        &lbrace;
            string nomTable = GetTableName&lt;T&gt;();
            loadedItems = new List&lt;T&gt;();

            if (string.IsNullOrEmpty(nomTable))
            &lbrace;
                OnLog($"No SQL Object has the type &lbrace;typeof(T)&rbrace;.");
                return;
            &rbrace;

            SqlDataReader sqlRead = this.ExecuteReaderCommand($"SELECT * FROM &lbrace;nomTable&rbrace;");

            if (sqlRead == null)
            &lbrace;
                OnLog($"No table or view named \'&lbrace;nomTable&rbrace;\' exists.");
                return;
            &rbrace;

            LoadItems(sqlRead, out loadedItems);

            if (sortItems && Array.IndexOf(typeof(T).GetInterfaces(), typeof(IComparable)) != -1)
            &lbrace;
                loadedItems.Sort();
                OnLog("Items were sorted.");
            &rbrace;
        &rbrace;

        public void LoadItems&lt;T&gt;(SqlDataReader sqlRead, out List&lt;T&gt; loadedItems) where T : SQLObject
        &lbrace;
            loadedItems = new List&lt;T&gt;(); // new();

            if (sqlRead == null)
            &lbrace;
                OnLog("Given SqlDataReader is not defined.");
                return;
            &rbrace;

            bool headersInitialized = false;
            string[] headers = null;

            // Get fields with the attribute SQLField
            var fields = typeof(Form1.Restaurant).GetFields().ToList();
            var names = new List&lt;string&gt;();
            for (int i = fields.Count - 1; i &gt;= 0; --i)
            &lbrace;
                var attribute = fields[i].GetCustomAttribute&lt;SQLFieldAttribute&gt;();

                if (attribute == null)
                    fields.RemoveAt(i);
                else
                    names.Add(attribute.GetName());
            &rbrace;

            try
            &lbrace;
                while (sqlRead.Read())
                &lbrace;
                    if (!headersInitialized)
                    &lbrace;
                        headers = new string[sqlRead.FieldCount];
                        for (int i = 0; i &lt; headers.Length; i++)
                        &lbrace;
                            headers[i] = sqlRead.GetName(i);
                        &rbrace;
                        headersInitialized = true;
                    &rbrace;

                    T instance = (T)Activator.CreateInstance(typeof(T));

                    for (int i = 0; i != fields.Count; ++i)
                        fields[i].SetValue(instance, GetValue(sqlRead, headers, names[fields.Count - i - 1], fields[i].FieldType));

                    loadedItems.Add(instance);
                &rbrace;
            &rbrace;
            catch (Exception e)
            &lbrace;
                OnLog(e.Message);
            &rbrace;

            //sqlRead.Close();
            //sqlRead.Dispose();

            TryCloseConnection();
        &rbrace;

        public int GetItemsCount&lt;T&gt;([CallerMemberName] string caller = "")
        &lbrace;
            string nomTable = GetTableName&lt;T&gt;();
            OnLog($"Request to get the items count of '&lbrace;nomTable&rbrace;'.", caller);

            if (string.IsNullOrEmpty(nomTable))
            &lbrace;
                OnLog($"No SQL Object has the type &lbrace;typeof(T)&rbrace;.");
                return -1;
            &rbrace;
            return this.ExecuteScalarCommand&lt;int&gt;($"SELECT COUNT(*) FROM &lbrace;nomTable&rbrace;");
        &rbrace;

        /// &lt;summary&gt;
        /// Updates the entry that has the same ID
        /// &lt;/summary&gt;
        public void UpdateItem&lt;T&gt;(T item) where T : SQLObject
        &lbrace;
            try
            &lbrace;
                // https://stackoverflow.com/a/4144817
                PropertyInfo[] properties = typeof(T).GetProperties();

                PropertyInfo firstProperty = properties[0];
                // TODO: Make an abstract SQLObject and search for the ID property

                KeyValuePair&lt;string, object&gt; IDCLASSE = new KeyValuePair&lt;string, object&gt;(firstProperty.Name, firstProperty.GetValue(item));

                string tableName = GetTableName&lt;T&gt;();

                SqlDataReader reader = this.ExecuteReaderCommand($"SELECT * FROM &lbrace;tableName&rbrace; WHERE &lbrace;IDCLASSE.Key&rbrace; = &lbrace;IDCLASSE.Value&rbrace;");
                reader.Read();

                foreach (PropertyInfo prop in properties)
                &lbrace;
                    object newValue = prop.GetValue(item);
                    object oldValue = reader[prop.Name];

                    // Optimisation (Limitation des packages envoyés)
                    if (!oldValue.Equals(newValue))
                    &lbrace;
                        this.ExecuteNonQueryCommand($"UPDATE &lbrace;tableName&rbrace; SET &lbrace;prop.Name&rbrace; = &lbrace;newValue&rbrace; WHERE &lbrace;IDCLASSE.Key&rbrace; = &lbrace;IDCLASSE.Value&rbrace;");
                        OnLog($"Updated \'&lbrace;prop.Name&rbrace;\' from &lbrace;oldValue&rbrace; to &lbrace;newValue&rbrace;");
                    &rbrace;
                &rbrace;
            &rbrace;
            catch (Exception e)
            &lbrace;
                OnLog(e);
            &rbrace;
        &rbrace;

        public void OnLog(object value, [CallerMemberName] string caller = "")
        &lbrace;
            string message = "";

            if (!string.IsNullOrEmpty(caller))
                message += $"[&lbrace;caller&rbrace;] ";

            _loggerAction?.Invoke(message + value.ToString());
        &rbrace;

        /// &lt;summary&gt;
        /// Try to open the SQL connection
        /// &lt;/summary&gt;
        /// &lt;param name="silentCheck"&gt;The error message will show if the connection is already opened&lt;/param&gt;
        private void TryOpenConnection(bool silentCheck = false, [CallerMemberName] string caller = "")
        &lbrace;
            if (_sqlConnection.State != System.Data.ConnectionState.Closed && _sqlConnection.State != System.Data.ConnectionState.Broken)
            &lbrace;
                if (!silentCheck)
                    OnLog($"The connection is already opened (&lbrace;_sqlConnection.State&rbrace;).", caller);
                return;
            &rbrace;

            try
            &lbrace;
                _sqlConnection.Open();
                OnLog("Successfully opened the SQL Connection.", caller);
            &rbrace;
            catch (Exception e)
            &lbrace;
                OnLog(e.Message, caller);
            &rbrace;
        &rbrace;

        public void CloseConnection([CallerMemberName] string caller = "") =&gt; TryCloseConnection(false, caller);

        /// &lt;summary&gt;
        /// Try to close the SQL connection
        /// &lt;/summary&gt;
        /// &lt;param name="silentCheck"&gt;The error message will show if the connection is already closed&lt;/param&gt;
        private void TryCloseConnection(bool silentCheck = false, [CallerMemberName] string caller = "")
        &lbrace;
            if (_sqlConnection.State == System.Data.ConnectionState.Broken ||
                _sqlConnection.State == System.Data.ConnectionState.Closed)
            &lbrace;
                if (!silentCheck)
                    OnLog($"The connection is already closed (&lbrace;_sqlConnection.State&rbrace;).", caller);
                return;
            &rbrace;

            try
            &lbrace;
                _sqlConnection.Close();
                OnLog("Successfully closed the SQL Connection.", caller);
            &rbrace;
            catch (Exception e)
            &lbrace;
                OnLog(e.Message, caller);
            &rbrace;
        &rbrace;

        ~SQLManager()
        &lbrace;
            TryCloseConnection(caller: "SQLManager");
        &rbrace;

        /// &lt;summary&gt;
        /// Determines what class can be converted into a SQL object
        /// &lt;/summary&gt;
        [AttributeUsage(AttributeTargets.Class, AllowMultiple = false, Inherited = true)]
        public class SQLObjectAttribute : Attribute
        &lbrace;
            string Name &lbrace; get; set; &rbrace;

            public SQLObjectAttribute(string name)
            &lbrace;
                Name = name;
            &rbrace;

            public string GetName() =&gt; Name;

            public bool IsNameValid() =&gt; !string.IsNullOrEmpty(Name);
        &rbrace;

        [AttributeUsage(AttributeTargets.Field, AllowMultiple = false)]
        public class SQLFieldAttribute : Attribute
        &lbrace;
            string Name &lbrace; get; set; &rbrace;

            public SQLFieldAttribute(string name)
            &lbrace;
                Name = name;
            &rbrace;

            public string GetName() =&gt; Name;
        &rbrace;

        [SQLObject(null)]
        public abstract class SQLObject
        &lbrace;
            /// &lt;summary&gt;
            /// Field that has an unique value for every object
            /// &lt;/summary&gt;
            public abstract object ID_OBJECT &lbrace; get; &rbrace;
        &rbrace;
    &rbrace;
&rbrace;
        </CodeBlock>
    </section>
    <section>
        <h2>Conclusion</h2>
        <p>
            It is not the best, but it works if you are trying to find something
            "small" that does the job. I'm not the greatest at T-SQL so feel
            free to modify it for your needs.
        </p>
    </section>
</article>
