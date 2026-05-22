<script>
    import CodeBlock from "$lib/components/CodeBlock.svelte";
    import LearnMoreTip from "$lib/components/Tips/LearnMoreTip.svelte";
    import WarningTip from "$lib/components/Tips/WarningTip.svelte";
</script>

<svelte:head>
    <title>PHP PDO</title>
    <link rel="icon" href="" type="image/x-icon" />
    <meta name="title" content="PHP PDO" />
    <meta
        name="description"
        content="A PHP project demonstrating a custom PDO management system for secure and structured database interaction using object-oriented principles."
    />
    <meta name="author" content="WarperSan" />
    <meta
        name="keywords"
        content="PHP PDO, PDO Manager, PHP Database, OOP PHP, PDO Wrapper, Stored Procedures, SQL Automation, PHP School Project"
    />
</svelte:head>

<article>
    <section>
        <h1>PHP PDO</h1>
        <p>
            <a href="https://www.php.net/manual/en/book.pdo.php" target="_blank"
                >PDO</a
            > is an extension of PHP that defines an interface for accessing databases
            through PHP. It allows to switch the underlying database without having
            to modify the code itself.
        </p>
        <p>
            For a school project, me and three other colleagues had to create a
            website from scratch using PHP. To enhance our developer experience,
            I created a system that would implement PDO while reflecting the
            database structure.
        </p>
    </section>
    <section>
        <h2>PDO Manager</h2>
        <p>
            The first step was to be able to communicate with the database via
            PHP. To achieve this, I had to create a class that would handle
            basic tasks like connecting to the database and call functions.
        </p>
        <p>
            The external code would simply need to run the following code in
            order to directly call procedures and functions:
        </p>
        <CodeBlock lang="php">
$a = 10;
$b = "0x0";
PDO_Manager::call_procedure("test", $a, $b, null);
        </CodeBlock>
        <p>
            Automatically, the manager would create the query needed, and execute it.
            This approach allows the callers to ignore the type conversions. The class
            would automatically convert PHP values into SQL values. For example, it would
            convert <code>null</code> into <code>NULL</code>, or booleans into <code>0</code> or <code>1</code>.
        </p>
    </section>
    <section>
        <h2>PDO Object</h2>
        <p>
            When we started the project, the main issue was the tight coupling between
            PHP and SQL. When using PDO, the properties' name would be used as the SQL
            columns.
        </p>
        <CodeBlock lang="php">
class User
&lbrace;
    public string $idUser = "";
    public string $alias = "";
    public string $name = "";
&rbrace;
        </CodeBlock>
        <p>
            The coupling prevents both sides from applying their naming preferences.
            PHP would prefer to use <code>$Id</code>, but SQL would prefer to use <code>idUser</code>.
        </p>
        <p>
            This becomes inviable, specially two different teams are working on
            either side. As soon as you want to apply a new naming preference, it requires
            changes across the entire codebase.
        </p>
        <p>
            To solve this issue, we had to add metadata to the properties to
            bridge the gap:
        </p>
        <CodeBlock lang="php">
class User extends PDO_Object
&lbrace;
    #[PDO_Object_Id("idUser")]
    public string $Id = "";

    #[PDO_Object_Id("alias")]
    public string $Alias = "";

    #[PDO_Object_Id("name")]
    public string $Name = "";
&rbrace;
        </CodeBlock>
        <p>
            The attribute <code>PDO_Object_id</code> allows to assign the column's name
            to the property, without worrying about it's name.
            
        </p>
        <p>
            It also allows to have type safety that are more understandable than
            before. Instead of taking a <code>map</code>, functions can require
            a certain object type:
        </p>
        <CodeBlock lang="php">
// Assumes the array has the correct values
function updateUser(array $user): void &lbrace; /* ... */ &rbrace;

// Requires the correct argument type
function updateUser(User $user): void &lbrace; /* ... */ &rbrace;
        </CodeBlock>
    </section>
    <section>
        <h2>Utilities</h2>
        <p>
            Whilst adding support for custom queries, I also added helper
            functions to create them:
        </p>
        <CodeBlock lang="php">
// Instead of this:
User::select(
    [User::NAME],
    "ORDER BY " + User::NAME + ", " + User::ALIAS + " LIMIT " + 5 + " OFFSET " + 10
);

// You could do this:
User::select(
    [User::NAME],
    orderByAll(
        [User::NAME],
        [User::ALIAS]
    ),
    limit(5, 10)
);
        </CodeBlock>
        <p>
            The methods allow to hide the exact implementation of the query.
            If the database had to change, these methods could change their inner
            workings to suit the new database.
        </p>
        <LearnMoreTip>
            This approach of query building works, but is pretty naïve. A better approach would be to utilize
            the <a href="https://refactoring.guru/design-patterns/builder" target="_blank">Builder pattern</a>.
        </LearnMoreTip>
    </section>
    <section>
        <h2>Conclusion</h2>
        <p>
            This project has taught me how to create an <a href="https://en.wikipedia.org/wiki/Object%E2%80%93relational_mapping" target="_blank">Object-relational mapping</a>
            from scratch, before even knowing what they were!
        </p>
        <p>
            This outlines how useful oriented-object can be at handling object related problems.
        </p>
        <WarningTip>
            Sadly, this idea was never made into a ready-to-use library. Concepts were made,
            but they were either abandoned or deprecated.
        </WarningTip>
    </section>
</article>
