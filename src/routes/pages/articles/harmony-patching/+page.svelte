<script>
    import { assets } from "$app/paths";
    import CodeBlock from "$lib/components/CodeBlock.svelte";
    import NoticeTip from "$lib/components/Tips/NoticeTip.svelte";
    import WarningTip from "$lib/components/Tips/WarningTip.svelte";

</script>
<svelte:head>
    <title>Harmony Patching</title>
    <link rel="icon" href="https://raw.githubusercontent.com/pardeike/Harmony/master/HarmonyLogo.png"
        type="image/x-icon" />
    <meta name="description"
        content="A beginner-friendly guide to Harmony patching in C#. Learn how to use prefixes, postfixes, and transpilers for modding applications.">
    <meta name="keywords"
        content="Harmony, C# patching, HarmonyLib, modding, prefix, postfix, transpiler, guide, tutorial">
    <meta name="author" content="WarperSan">

    <script defer src="/scripts/elements/CodeElement.js"></script>
</svelte:head>

    <article>
        <section>
            <h1>Harmony Patching Guide</h1>
            <p>
                Harmony is a tool that allows to alter the functionality in C# applications. This allows to modify the
                application without needing to recompile it.
            </p>
            <NoticeTip>This guide breaks things down in a simpler way. For more detailed info, check out the <a
                    href="https://harmony.pardeike.net/articles/intro.html" target="_blank">official documentation</a>.
            </NoticeTip>
        </section>
        <section>
            <h2>Basics</h2>
            <p>
                To make the rest of this guide easier to follow, let's go over a few basics first.
            </p>
            <NoticeTip>If you'd like to dive deeper into the fundamentals of Harmony, check out the <a
                    href="https://harmony.pardeike.net/articles/basics.html" target="_blank">official basics
                    article</a>.</NoticeTip>
        </section>
        <section>
            <h3>Creating patches</h3>
            <p>
                To create a patch, you need to write code similar to the following:
            </p>
            <CodeBlock lang="csharp">
[HarmonyPatch(typeof(OriginalClass))]
internal class OriginalClass_Patches
&lbrace;
    // Content to be followed
&rbrace;
            </CodeBlock>
            <p>
                Grouping patches by type improves readability and maintainability by keeping the code organized and
                structured.
            </p>
            <WarningTip>
                The following example demonstrates one approach to creating patches based on my experience. Other valid
                methods exist as well.
            </WarningTip>
        </section>
        <section>
            <h3>Applying patches</h3>
            <p>
                For patches to work correctly, they need to be applied first. There are several ways to do this, but the
                example below is the cleanest and most reliable approach I've found:
            </p>
            <CodeBlock lang="csharp">
var harmony = new HarmonyLib.Harmony("com.company.project.product");

harmony.PatchAll(typeof(Patches.OriginalClass_Patches));
harmony.PatchAll(typeof(Patches.OriginalClass2_Patches));
harmony.PatchAll(typeof(Patches.OriginalClass3_Patches));
            </CodeBlock>
            <p>
                If your project doesn't involve patching dependencies, you can simplify things by using
                <code>harmony.PatchAll()</code> without any arguments. It will automatically detect and apply all
                available patches in the project.
            </p>
            <p>
                While applying all patches at once is convenient, I find that applying them by type gives more control —
                especially when dealing with dependencies:
            </p>
            <CodeBlock lang="csharp">
var harmony = new HarmonyLib.Harmony("com.company.project.product");

harmony.PatchAll(typeof(Patches.OriginalClass_Patches));
harmony.PatchAll(typeof(Patches.OriginalClass2_Patches));

if (Dependency.ModTest.Enabled)
&lbrace;
    harmony.PatchAll(typeof(Patches.ModdedClass_Patches));
    harmony.PatchAll(typeof(Patches.ModdedClass2_Patches));
&rbrace;
            </CodeBlock>
        </section>
        <section>
            <h2>Types of Patching</h2>
            <p>
                Harmony has a lot of different tools to modify the application. However, I will be focusing on 3 types:
            </p>
            <ul>
                <li>Prefix</li>
                <li>Postfix</li>
                <li>Transpiler</li>
            </ul>
            <p>
                In my opinion, they are the most important ones that you will be using while you mod any C# application.
            </p>
            <NoticeTip>If you'd like to dive deeper into either types, check out the official article about <a
                    href="https://harmony.pardeike.net/articles/patching-prefix.html" target="_blank">prefixes</a>, <a
                    href="https://harmony.pardeike.net/articles/patching-postfix.html" target="_blank">postfixes</a> and
                <a href="https://harmony.pardeike.net/articles/patching-transpiler.html"
                    target="_blank">transpilers</a>.
            </NoticeTip>
            <NoticeTip>In the examples, the original method is:
                <code>int OriginalMethod(int number, string format)</code>
            </NoticeTip>
        </section>
        <section>
            <h3>Prefix</h3>
            <p>
                A prefix is a method that runs before the original method. It's great for running early logic or
                skipping the original method entirely. Here's a basic example:
            </p>
            <CodeBlock lang="csharp">
[HarmonyPatch(nameof(OriginalClass.OriginalMethod)), HarmonyPrefix]
private static void OriginalMethod_Prefix()
&lbrace;
    // Custom logic before the original method runs
&rbrace;
            </CodeBlock>
            <p>
                If you need access to the object instance or the method's arguments, just include them in the prefix
                method's parameters:
            </p>
            <CodeBlock lang="csharp">
[HarmonyPatch(nameof(OriginalClass.OriginalMethod)), HarmonyPrefix]
private static void OriginalMethod_Prefix(OriginalClass __instance, int number, string format)
&lbrace;
    // Use __instance or modify arguments before the original method
&rbrace;
            </CodeBlock>
            <p>
                You can also control whether the original method runs at all. By returning <code>false</code>, the
                original method will be skipped entirely:
            </p>
            <CodeBlock lang="csharp">
[HarmonyPatch(nameof(OriginalClass.OriginalMethod)), HarmonyPrefix]
private static bool OriginalMethod_Prefix()
&lbrace;
    // Skip the original method
    return false;
&rbrace;
            </CodeBlock>
        </section>
        <section>
            <h3>Postfix</h3>
            <p>
                A postfix is a method that runs after the original method has completed. It's great for running
                follow-up logic or modifying the method's result. Here's a basic example:
            </p>
            <CodeBlock lang="csharp">
[HarmonyPatch(nameof(OriginalClass.OriginalMethod)), HarmonyPostfix]
private static void OriginalMethod_Postfix()
&lbrace;
    // Custom logic after the original method runs
&rbrace;
            </CodeBlock>
            <p>
                You can also access the return value using the <code>ref</code> keyword with <code>__result</code> to
                modify what the original method returns:
            </p>
            <CodeBlock lang="csharp">
[HarmonyPatch(nameof(OriginalClass.OriginalMethod)), HarmonyPostfix]
private static void OriginalMethod_Postfix(ref int __result)
&lbrace;
    __result += 10; // Modify the return value
&rbrace;
            </CodeBlock>
        </section>
        <section>
            <h3>Transpiler</h3>

            <WarningTip>
                Use a transpiler only when simpler patching methods are insufficient. This technique requires a good
                understanding of IL (Intermediate Language) code.
            </WarningTip>

            <p>
                A transpiler modifies a method by injecting instructions directly into its compiled IL code. This offers
                precise control over how and where logic is inserted. This is used in scenarios that cannot be handled
                with other patch types.
            </p>

            <p>Here's a basic template for a transpiler:</p>

            <CodeBlock lang="csharp">
[HarmonyPatch(nameof(OriginalClass.OriginalMethod)), HarmonyTranspiler]
private static IEnumerable&lt;CodeInstruction&gt; OriginalMethod_Transpiler(IEnumerable&lt;CodeInstruction&gt; instructions)
&lbrace;
    var code = new List&lt;CodeInstruction&gt;(instructions);

    var insertionIndex = -1;

    for (var i = 0; i &lt; code.Count; i++)
    &lbrace;
        var instruction = code[i];

        // TODO: Identify the appropriate insertion point

        insertionIndex = i;
        break;
    &rbrace;

    if (insertionIndex == -1)
        return code;

    var injected = new CodeInstruction[]
    &lbrace;
        // TODO: IL instructions to insert
    &rbrace;;

    code.InsertRange(insertionIndex, injected);

    return code;
&rbrace;
            </CodeBlock>
            <p>Let's use the following method as a reference:</p>

            <CodeBlock lang="csharp">
public int OriginalMethod(int number, string format)
&lbrace;
    var formatted = number.ToString(format);

    // Line to add:
    // formatted = "|" + formatted + "|";

    System.Console.WriteLine(formatted);
    return number;
&rbrace;
            </CodeBlock>
            <NoticeTip>
                To analyze IL code, tools like
                <a href="https://www.jetbrains.com/help/rider/Viewing_Intermediate_Language.html#using-il-viewer"
                    target="_blank">Rider's IL Viewer</a> or
                <a href="https://github.com/dnSpy/dnSpy" target="_blank">dnSpy</a> are highly recommended. These tools
                help visualize compiled IL instructions, making it easier to pinpoint insertion points.
            </NoticeTip>

            <p>
                To determine where to inject your code, you will need to inspect the IL output of the method and
                identify a unique, reliable pattern of opcodes that appear at the desired location.
            </p>

            <p>For our example, the IL looks like this:</p>

            <CodeBlock lang="clike">
nop
ldarga.s     number
ldarg.2      // format
call         instance string [mscorlib]System.Int32::ToString(string)
stloc.0      // formatted
ldloc.0      // formatted
call         void [mscorlib]System.Console::WriteLine(string)
nop
ldarg.1      // number
stloc.1      // V_1
br.s         IL_0015
ldloc.1      // V_1
ret
            </CodeBlock>
            <p>
                The instruction <code>ldloc.0</code> is a good marker. It appears just before the call to
                <code>Console.WriteLine</code>, which is where we want to inject our logic. We can then go through every
                instruction, looking for the desired pattern.
            </p>

            <CodeBlock lang="csharp">
var insertionIndex = -1;

for (var i = 0; i &lt; code.Count - 1; i++)
&lbrace;
    var instruction = code[i + 1];

    if (instruction.opcode != OpCodes.Ldloc_0)
        continue;

    insertionIndex = i;
    break;
&rbrace;
            </CodeBlock>
            <NoticeTip>
                For more precise targeting, consider matching a sequence of instructions—for example,
                <code>ldloc.0</code> followed by <code>call</code>. This reduces the risk of injecting at the wrong
                place if similar opcodes appear elsewhere in the method.
            </NoticeTip>

            <p>
                To determine the exact IL instructions to inject, you can write the desired logic in a separate dummy
                method, then examine its IL output. For our target modification, the IL looks like this:
            </p>

            <CodeBlock lang="clike">
ldstr        "|"
ldloc.0      // formatted
ldstr        "|"
call         string [mscorlib]System.String::Concat(string, string, string)
stloc.0      // formatted
            </CodeBlock>
            <p>
                Incorporating these instructions into the transpiler gives us the final implementation:
            </p>

            <CodeBlock lang="csharp">
[HarmonyPatch(nameof(OriginalClass.OriginalMethod)), HarmonyTranspiler]
private static IEnumerable&lt;CodeInstruction&gt; OriginalMethod_Transpiler(IEnumerable&lt;CodeInstruction&gt; instructions)
&lbrace;
    var code = new List&lt;CodeInstruction&gt;(instructions);

    var insertionIndex = -1;

    for (var i = 0; i &lt; code.Count - 1; i++)
    &lbrace;
        var instruction = code[i + 1];

        if (instruction.opcode != OpCodes.Ldloc_0)
            continue;

        insertionIndex = i;
        break;
    &rbrace;

    if (insertionIndex == -1)
        return code;

    var injected = new CodeInstruction[]
    &lbrace;
        new(OpCodes.Ldstr, "|"),
        new(OpCodes.Ldloc_0),
        new(OpCodes.Ldstr, "|"),
        new(OpCodes.Call, AccessTools.Method(
            typeof(string),
            nameof(string.Concat),
            new[] &lbrace; typeof(string), typeof(string), typeof(string) &rbrace;
        )),
        new(OpCodes.Stloc_0)
    &rbrace;;

    code.InsertRange(insertionIndex, injected);

    return code;
&rbrace;
            </CodeBlock>
            <NoticeTip>For more complex logic, it is recommended to inject instructions that call a separate method
                containing your code. This approach is simpler and more maintainable than injecting each instruction
                individually.</NoticeTip>
        </section>

    </article>