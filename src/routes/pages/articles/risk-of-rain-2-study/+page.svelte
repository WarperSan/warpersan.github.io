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
    </article>