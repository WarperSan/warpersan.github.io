<script>
    import CodeBlock from "$lib/components/CodeBlock.svelte";
    import LearnMoreTip from "$lib/components/Tips/LearnMoreTip.svelte";
    import NoticeTip from "$lib/components/Tips/NoticeTip.svelte";
    import WarningTip from "$lib/components/Tips/WarningTip.svelte";

</script>
<svelte:head>
    <meta name="description" content="A case study of the code infrastructure for Risk of Rain 2." />
    <meta name="keywords" content="Risk of Rain 2, Code Infrastructure, WarperSan" />
    <title>Risk of Rain 2 Code Infrastructure</title>

    <link rel="icon" href="https://cdn2.steamgriddb.com/icon/c4492cbe90fbdbf88a5aec486aa81ed5/32/32x32.png" type="image/x-icon" />
</svelte:head>

    <article>

        <section>
            <h1>Risk of Rain 2 Study</h1>
            <p>
                While creating a mod for <a href="https://store.steampowered.com/app/632360/Risk_of_Rain_2/" target="_blank">Risk of Rain 2</a>,
                I found myself being amazed at the game infrastructure. Everything seems so well made, and thought out.
            </p>
            <p>
                I wanted to share my findings and thoughts on the infrastructure that the game uses. I will be going over
                how some aspects of the game work, what design patterns are used, and why some things should or should not
                be done in your own project.
            </p>
            <NoticeTip>
                Since I'm writing this article as I'm analyzing the code, things will be in a weird order and can be wrong to some extent. 
            </NoticeTip>
            <WarningTip>
                I am not affiliated with <a href="https://www.hopoogames.com/">Hopoo Games</a>. This article is
                purely for educational purposes and to share my thoughts on the code infrastructure of Risk of Rain 2.
                I won't be sharing any actual code, and it will all be recreated from scratch.
            </WarningTip>
        </section>

        <section>
            <h2>Achievements</h2>
            <p>
                In this game, players can unlock achievements by completing certain tasks. Traditionally, games would be using
                ScriptableObjects to store the achievement data. This allows to manage the data directly in the Editor, and streamlines
                the process of adding new achievements. Developers simply need to create a new instance, link every required data,
                and the achievement is ready to be used in the game.
            </p>
            <p>
                However, this usually comes with a big downside: the entire codebase needs to know about achievements.
                Since the achievements are simply data, the game needs to have a way to report the progress of achievements.
                This can lead to coupling between the achievement system and systems that shouldn't know about it.
            </p>
            <p>
                For example, in <a href="https://store.steampowered.com/app/1030300/Hollow_Knight_Silksong/" target="_blank">Silksong</a>,
                when the game needs to award an achievement, the system managing the specific part has to call the
                achievement manager to report the progress.
            </p>
            <CodeBlock lang="csharp">
public class CrestManager
&lbrace;
    public void UnlockCrest(Crest crest)
    &lbrace;
        // Code to handle unlocking the crest

        AchievementManager.AwardAchievement("UNLOCK_CREST");

        if (AllCrestsUnlocked())
            AchievementManager.AwardAchievement("ALL_CRESTS_UNLOCKED");
    &rbrace;
&rbrace;
            </CodeBlock>
            <p>
                Although this example is simple, it shows how this method leads to coupling between two systems that shouldn't know
                about each other. If an achievement required the player to fall for 30 meters, then the physics system would need
                to know about the achievement system. Over time, this makes the codebase harder to maintain, and more prone to bugs.
            </p>
            <p>
                Risk of Rain 2 avoids this issue by using a different approach. Instead of having other systems report the progress,
                achievements themselves listen and react to events. This allows to decouple the systems, as one system only needs to
                broadcast events, without caring who is listening.
            </p>
            <p>
                To do so, the game needs to have one class per achievement. The role of this class is to listen to events,
                and react to them.
            </p>
            <CodeBlock lang="csharp">
// Create the achievement class
public class UnlockAllCrestsAchievement : Achievement
&lbrace;
    public UnlockAllCrestsAchievement()
    &lbrace;
        CrestManager.OnCrestUnlocked += OnCrestUnlocked;
    &rbrace;

    private void OnCrestUnlocked(Crest crest)
    &lbrace;
        if (CrestManager.AllCrestsUnlocked())
            Award();
    &rbrace;
&rbrace;

// Then broadcast the event in the CrestManager
public class CrestManager
&lbrace;
    public static event Action&lt;Crest&gt; OnCrestUnlocked;
    
    public void UnlockCrest(Crest crest)
    &lbrace;
        // Code to handle unlocking the crest

        OnCrestUnlocked?.Invoke(crest);
    &rbrace;
&rbrace;
            </CodeBlock>
            <p>
                The crest system now doesn't need to know about the achievement system. Any
                system can simply broadcasts an event, and the achievement reacts to it.
            </p>
            <p>
                However, this approach comes with its own set of problems. For starter, it requires
                the codebase to be more flexible. Since achievements depend on events,
                systems need to offer events to broadcast. This can be a problem if the system is
                not designed to offer any events.
            </p>
            <p>
                On top of that, Risk of Rain 2 takes a weird approach concerning achievements and their data.
                With ScriptableObjects, all information concerning the achievement is stored in the asset. It
                is also very easy to find all achievements by searching for the asset type.
            </p>
            <p>
                However, this game replaces ScriptableObjects entirely with a class. The class is decorated
                with an attribute that contains all the data that would normally be in the ScriptableObject.
                This makes it difficult to manage the dependencies, as some are hidden behind hardcoded values.
            </p>
            <CodeBlock lang="csharp">
[Achievement(icon: "path/to/icon/UnlockAllCrestsIcon", name: "Unlock All Crests", description: "Unlock all crests.")]
public class UnlockAllCrestsAchievement : Achievement
&lbrace;
    // ...
&rbrace;
            </CodeBlock>
            <p>
                Unity has no idea that the texture <code>UnlockAllCrestsIcon</code> is implicitly used in the game. If the icon is deleted,
                the game can break, and the engine won't be able to warn the developer about it.
            </p>
            <p>
                Overall, this approach is interesting, but it comes with its own set of problems. It is a good
                example of how a solution can solve one problem, but create another one.
            </p>
            <LearnMoreTip>
                <p>
                    A better approach would be to combine the two approaches. The achievement data could be stored in a ScriptableObject,
                    and the class could be used to listen to events and react to them. This would allow to have the best of
                    both worlds: the data is easy to manage, and the systems are decoupled.
                </p>
                <br>
                <p>
                    Although this brings other problems (how to refer a type in a ScriptableObject, how to instantiate the class, etc.),
                    it would be a better approach that utilizes the strengths of both approaches.
                </p>
            </LearnMoreTip>
        </section>

        <section>
            <h2>Catalogs and Indexes</h2>
            <p>
                In Risk of Rain 2, the game uses a system of catalogs to manage the game's content.
                For example, all artifacts (game modifiers) are stored inside the <code>ArtifactCatalog</code>.
                This allows to have all related data stored in one singular place.
            </p>
            <p>
                This is a genuinely great approach. It allows to have a single source of truth, and
                to easily pass along references. Since the catalogs are the only way to access
                the data, all systems are guaranteed to be using the same data.
            </p>
            <p>
                As I was making <a href="https://github.com/WarperSan/WhatchaGotThere" target="_blank">my own mod, WhatchaGotThere</a>,
                I found myself stubbed by the implementation of the system. The more conventional way to implement this structure would be to
                return a number ID (e.g.: <code>int</code>) or a special handler type (e.g.: <code>CatalogItem</code>). However, the developers chose a
                different approach: indexes via enumerations.
            </p>
            <CodeBlock lang="csharp">
// Potential implementations
int GetArtifactByName(string name);
ArtifactItem GetArtifactByName(string name);

// Implementation chose
ArtifactEnum GetArtifactByName(string name);
            </CodeBlock>
            <p>
                At first, it seems weird to use enumerations (<code>enum</code> for short) as indexes. Enums were designed to 
                be used as labels for a set of integer constants. This alone doesn't raise any flags, as there are ways to
                use them for this purpose.
            </p>
            <CodeBlock lang="csharp">
// One entry per item
enum Artifacts
&lbrace;
    Chaos   = 1,
    Command = 2,
    Death   = 3,
    // ...
&rbrace;
            </CodeBlock>
            <p>
                Using enums like this does hurt the expandability of the system: adding an item
                requires a developer to edit manually the enum, and create a new entry. However,
                the developers did not used enums in the conventional way. This can be viewed when
                looking at their actual implementation.
            </p>
            <CodeBlock lang="csharp">
public enum ArtifactIndex
&lbrace;
	None = -1,
&rbrace;
            </CodeBlock>
            <p>
                Instead of containing an entry for each item, the enumeration only contains the <code>None</code>
                entry. Since enumerations are simply integers with named values, they can fully be used as their
                raw value. This implementation has two advantages: no memory overhead and type safety.
            </p>
            <p>
                An implementation that could've been used was to use nullable numbers
                (<code>int?</code> or <code>Nullable&lt;int&gt;</code>). It allows to display an invalid index, 
                using <code>null</code>, as well as a valid one. However, it comes to the cost of the overhead brought
                by <code>Nullable</code>. The added structure contains its own fields, which increases the size
                of the data. This can lead to performance issues when most of the game rely on passing along this
                kind of data.
            </p>
            <p>
                Another implementation that could've been used was to simply use numbers (<code>int</code>). Under
                the hood, that is what the chosen implementation does. However, it's hidden behind a type. Using
                the raw value itself would've caused problems. Having a field of type <code>int</code> doesn't 
                limit the caller and doesn't force them to understand the systems.
            </p>
            <CodeBlock lang="csharp">
struct Data
&lbrace;
    public int Index;
    public ArtifactIndex Artifact;
&rbrace;

var data = new Data();

// Allows to set any int implicitly
data.Index = 2541;

// Errors when setting an int implicitly
data.Artifact = 4241;
            </CodeBlock>
            <p>
                Of course, this is not a fully fool-proofed system. A developer can still force the type change
                and assign a number as an enumeration. However, this action now becomes a deliberate action, instead
                of a simple negligence mistake.
            </p>
            <p>
                Overall, this implementation is very interesting. It got me wondering for a good hour why the
                developers have used this one instead of another implementation. It increases the learning curve
                of the codebase, but brings an elegant solution to a simple yet complex problem.
            </p>
        </section>
    </article>