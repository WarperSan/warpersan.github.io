<script>
    import { asset } from "\$app/paths";
    import CodeBlock from "$lib/components/CodeBlock.svelte";
    import WarningTip from "$lib/components/Tips/WarningTip.svelte";

</script>
<svelte:head>
    <title>PHP PDO</title>
    <link rel="icon" href="" type="image/x-icon" />
    <meta name="title" content="PHP PDO">
    <meta name="description"
        content="A PHP project demonstrating a custom PDO management system for secure and structured database interaction using object-oriented principles.">
    <meta name="author" content="WarperSan">
    <meta name="keywords"
        content="PHP PDO, PDO Manager, PHP Database, OOP PHP, PDO Wrapper, Stored Procedures, SQL Automation, PHP School Project">
</svelte:head>

    <article>
        <section>
            <h1>PHP PDO</h1>
            <p>
                The <code>PDO</code> is an extension of PHP that defines an interface for accessing databases through
                PHP. This allows to switch the underlying database without having to modify the code itself.
            </p>
            <p>
                For a school project, me and three other colleagues had to create a website from scratch using PHP. To
                make it easier, I created a system that would implement PDO while reflecting the database structure.
            </p>
        </section>
        <section>
            <h2>PDO Manager</h2>
            <p>
                In order to make the bridge between the PDO interface and the external code, I had to create a manager
                that would handle basic tasks. For example, it was able to connect to the database and call stored
                procedures and functions with the given arguments.
            </p>
            <p>
                The external code would simply need to run the following code in order to directly call procedures and
                functions:
            </p>
            <CodeBlock lang="php">
$a = 10;
$b = "0x0";
PDO_Manager::call_procedure("test", $a, $b, null);
            </CodeBlock>
            <p>
                The manager would then automatically create the query needed to call it. The advantage is also that the
                manager would convert PHP values into SQL values. For example, it would convert <code>null</code> into
                <code>NULL</code>, or <code>true</code> into <code>0</code> or <code>1</code>.
            </p>
        </section>
        <section>
            <h2>PDO Object</h2>
            <p>
                The main problem we had with the current use of PDO is that elements are handled through string maps.
                This can be insecured, because each mention of a column needs the exact column name. The types
                might also be wrong due to most of the values being strings.
            </p>
            <p>
                This problematic was solved by creating a class that would bridge this gap:
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
                By giving a string map, the object would assign each value to the correct property, following the
                column's name defined in the attribute. This allows to separate the database names and the PHP names,
                which can be different due to different conventions.
            </p>
            <p>
                It also allows to have type safety that are more understandable than before:
            </p>
            <CodeBlock lang="php">
function updateUser(array $user): void
&lbrace;
    // Need to assume that the array has the correct values
&rbrace;

function updateUser(User $user): void
&lbrace;
    // Prevents giving the wrong values
&rbrace;
</CodeBlock>
            <p>
                You can also add instance functions to these classes to make special queries. For example, you could
                call <code>$user->censorName()</code> to call special queries or functions from a given state.
            </p>
        </section>
        <section>
            <h2>Utilities</h2>
            <p>
                While adding the support for custom queries, I also added custom functions to help create the query:
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
    orderByAll([User::NAME], [User::ALIAS]),
    limit(5, 10)
);
</CodeBlock>
            <p>
                It hides the exact implementation of the queries whilst keeping it understandable and easily modifiable.
                You would only need to modify the function <code>limit</code> to change its behaviour.
            </p>
        </section>
        <section>
            <h1>Conclusion</h1>
            <p>
                This little project is very useful to efficiently handle oriented-object problems. It unifies the
                easiness of oriented-object programming while building upon the interface of PDO.
            </p>
            <WarningTip>
                Altough I've made concepts of this library, none are properly done. Either they are abandonned or
                they are deprecated.
            </WarningTip>
        </section>
    </article>