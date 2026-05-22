<script>
    import CodeBlock from "$lib/components/CodeBlock.svelte";
    import NoticeTip from "$lib/components/Tips/NoticeTip.svelte";
    import WarningTip from "$lib/components/Tips/WarningTip.svelte";
</script>

<svelte:head>
    <title>Harmony Patching</title>
    <link
        rel="icon"
        href="https://raw.githubusercontent.com/pardeike/Harmony/master/HarmonyLogo.png"
        type="image/x-icon"
    />
    <meta
        name="description"
        content="A beginner-friendly guide to Harmony patching in C#. Learn how to use prefixes, postfixes, and transpilers for modding applications."
    />
    <meta
        name="keywords"
        content="Harmony, C# patching, HarmonyLib, modding, prefix, postfix, transpiler, guide, tutorial"
    />
    <meta name="author" content="WarperSan" />
</svelte:head>

<article>
    <section>
        <h1>Harmony Patching Guide</h1>
        <p>
            <a href="https://harmony.pardeike.net/index.html">Harmony</a> is a library that allows
            developers to alter the functionality of C# applications at runtime.
        </p>
        <p>
            This is a simplified overview. For the full reference, see the
            <a href="https://harmony.pardeike.net/articles/intro.html" target="_blank">official documentation</a>.
        </p>
    </section>

    <section>
        <h2>What is Patching?</h2>
        <p>
            <a href="https://en.wikipedia.org/wiki/Monkey_patch" target="_blank">Patching</a> is the act of altering
            an existing function at runtime.
        </p>
        <p>
            As opposed to recompilation, patching allows developers to apply changes and fixes to a program that is already released.
            This can be done for small bug fixes, security updates or modding the program.
        </p>
    </section>

    <section>
        <h2>How to Create Patches?</h2>
        <p>
            Now that patching is familiar territory, we can move on to writing our first patches.
        </p>
        <NoticeTip>
            The following methods reflect a preferred style. Other valid approaches exist.
        </NoticeTip>
        <p>
            Patches can be located anywhere in the project. For convenience, patches will often be
            stored inside the <code>Patches/</code> folder. 
        </p>
        <p>
            Next, create a class to hold the patches for each type:
        </p>
        <CodeBlock lang="csharp">
[HarmonyPatch(typeof(SomeClass))]
class SomeClass_Patches
&lbrace;
    // ...
&rbrace;
        </CodeBlock>
        <p>
            Grouping patches this way keeps related code together, improving readability and maintainability.
        </p>
        <p>
            Finally, add patch methods inside the class as needed:
        </p>
        <CodeBlock lang="csharp">
[HarmonyPatch(typeof(SomeClass))]
class SomeClass_Patches
&lbrace;
    [HarmonyPatch(nameof(SomeClass.MethodA)), HarmonyPrefix]
    private static void MethodA_Prefix()
    &lbrace;
        // Custom prefix logic
    &rbrace;

    [HarmonyPatch(nameof(SomeClass.MethodA)), HarmonyPostfix]
    private static void MethodA_Postfix()
    &lbrace;
        // Custom postfix logic
    &rbrace;
&rbrace;
        </CodeBlock>
    </section>

    <section>
        <h2>How to Apply Patches?</h2>
        <p>
            For patches to work, they need to be manually applied first. Harmony offers
            ways to apply patches automatically.
        </p>
        <NoticeTip>
            The following methods reflect a preferred style. Other valid approaches exist.
        </NoticeTip>
        <p>
            The first step is to create a new instance of Harmony:
        </p>
        <CodeBlock lang="csharp">
static void ApplyPatches()
&lbrace;
    var harmony = new HarmonyLib.Harmony("com.company.project.product");
&rbrace;
        </CodeBlock>
        <NoticeTip>
            The identifier passed to the instance must be unique to your project.
            It allows other developers to apply their patches before or after yours.
        </NoticeTip>
        <p>
            The simplest way is to call <code>PatchAll()</code>:
        </p>
        <CodeBlock lang="csharp">
static void ApplyPatches()
&lbrace;
    var harmony = new HarmonyLib.Harmony("com.company.project.product");
    harmony.PatchAll();
&rbrace;
        </CodeBlock>
        <p>
            This will automatically detect and apply all patches found in the project.
        </p>
        <p>
            Although this method is useful, it can lead to issues when dealing with soft
            dependencies. Some types might not exist at runtime, which could lead to crashes.
        </p>
        <p>
            A solution is to call <code>PatchAll()</code> while passing the class's type:
        </p>
        <CodeBlock lang="csharp">
static void ApplyPatches()
&lbrace;
    var harmony = new HarmonyLib.Harmony("com.company.project.product");

    harmony.PatchAll(typeof(Patches.SomeClass_Patches));
    harmony.PatchAll(typeof(Patches.OtherClass_Patches));

    if (Dependency.IsEnabled)
    &lbrace;
        harmony.PatchAll(typeof(Patches.ModdedClass_Patches));
        harmony.PatchAll(typeof(Patches.ModdedClass2_Patches));
    &rbrace;
&rbrace;
        </CodeBlock>
        <p>
            Call this method to apply all patches.
            It is recommended to apply them during <code>Awake()</code>.
        </p>
    </section>

    <section>
        <h2>Types of Patch</h2>
        <p>
            There are 3 types of patches that are available to developers:
        </p>
        <ul>
            <li><a href="#prefix">Prefix</a></li>
            <li><a href="#postfix">Postfix</a></li>
            <li><a href="#transpiler">Transpiler</a></li>
        </ul>
        <p>
            Each offers a different use case, and should be used in their given cases.
        </p>
    </section>

    <section>
        <h3 id="prefix">Prefix</h3>
        <p>
            Prefixes are methods executed <b>before</b> the original method. They allow to run logic before the
            original method, or replace the method entirely.
        </p>
        <p>
            As an example, we will simulate a survival game. We desire to add a "x5 damage weather", but the game
            doesn't offer a built-in solution.
        </p>
        <p>
            To achieve this result, we will need to add the logic ourselves. After digging in the code, we find this method: 
        </p>
        <CodeBlock lang="csharp">
void DamageEntity(Entity entity, int damage) &lbrace; /* ... */ &rbrace;
        </CodeBlock>
        <p>
            It is called when the game wants to apply damage to an entity.
        </p>
        <p>
            To add our logic, we will need to create the prefix patch:
        </p>
        <CodeBlock lang="csharp">
[HarmonyPatch(nameof(DamageEntity)), HarmonyPrefix]
private static void DamageEntity_Prefix()
&lbrace;
    Debug.Log("Custom Logic");
&rbrace;
        </CodeBlock>
        <p>
            Each time an entity will be damaged, the game will print our message to the console.
            However, this doesn't solve our issue. The entities still take their normal amount of damage.
        </p>
        <p>
            We will need to access and modify the arguments:
        </p>
        <CodeBlock lang="csharp">
[HarmonyPatch(nameof(DamageEntity)), HarmonyPrefix]
private static void DamageEntity_Prefix(Entity entity, ref int damage)
&lbrace;
    damage = damage * 5;
&rbrace;
        </CodeBlock>
        <p>
            And we did it! Each time the game will damage an entity, our code will multiply the incoming damage by 5.
        </p>
        <p>
            Alternatively, we might desire to ignore any attack weaker than 5.
        </p>
        <p>
            We will need to tell Harmony to skip the original method:
        </p>
        <CodeBlock lang="csharp">
[HarmonyPatch(nameof(DamageEntity)), HarmonyPrefix]
private static bool DamageEntity_Prefix(Entity entity, int damage)
&lbrace;
    // Skip the original method
    if &lpar;damage &lt; 5&rpar;
        return false;
    
    // Continue the call as normal
    return true;
&rbrace;
        </CodeBlock>
    </section>

    <section>
        <h3 id="postfix">Postfix</h3>
        <p>
            Postfixes are methods executed <b>after</b> the original method. They allow to run logic after the original method,
            or modify the method's output.  
        </p>
        <p>
            As an example, we will simulate a factory game. We want to add a random nickname before our machines' name,
            but the game doesn't offer a built-in solution.
        </p>
        <p>
            To achieve this result, we will need to add the logic ourselves. After digging in the code, we find this method:
        </p>
        <CodeBlock lang="csharp">
string GetName(Machine machine) &lbrace; /* ... */ &rbrace;
        </CodeBlock>
        <p>
            It is called when the game wants to display the name of the machine.
        </p>
        <p>
            To add our logic, we will need to create the postfix patch:
        </p>
        <CodeBlock lang="csharp">
[HarmonyPatch(nameof(GetName)), HarmonyPostfix]
private static void GetName_Postfix()
&lbrace;
    Debug.Log("Custom Logic");
&rbrace;
        </CodeBlock>
        <p>
            Each time the game displays the name of a machine, our message will be printed to the console.
            However, this doesn't solve our issue. The machines still display their generic name.
        </p>
        <p>
            We will need to access and modify the arguments:
        </p>
        <CodeBlock lang="csharp">
[HarmonyPatch(nameof(GetName)), HarmonyPostfix]
private static void GetName_Postfix(ref string __result)
&lbrace;
    string[] names = new string[] &lbrace; "Bob", "Alice", "Pablo", "Claude" &rbrace;;
    string randomName = names[Random.Range(0, names.Count)];

    __result = randomName + " &lpar;" + __result + "&rpar;";
&rbrace;
        </CodeBlock>
        <p>
            And we did it! Each time the game will display the name of a machine, our code will add
            a random nickname to it.
        </p>
    </section>

    <section>
        <h3 id="transpiler">Transpiler</h3>
        <p>
            Transpilers are methods that modifies the code of the original method. They allow to run complex logic within a method.
        </p>
        <WarningTip>
            Transpilers should only be used when simpler patching methods are insufficient. This method requires an understanding
            of <a href="https://en.wikipedia.org/wiki/Common_Intermediate_Language">Common Intermediate Language</a>.
        </WarningTip>
        <i>Coming soon</i>
    </section>
</article>
