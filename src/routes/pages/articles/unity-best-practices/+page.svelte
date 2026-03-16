<script>
    import { assets } from "$app/paths";
    import LearnMoreTip from "$lib/components/Tips/LearnMoreTip.svelte";
    import NoticeTip from "$lib/components/Tips/NoticeTip.svelte";
    import WarningTip from "$lib/components/Tips/WarningTip.svelte";

</script>
<svelte:head>
    <meta name="description" content="A list of every best practice I have found for game development." />
    <meta name="keywords" content="Unity, Best Practices, WarperSan" />
    <title>Unity Best Practices</title>

    <script defer src="/scripts/elements/CodeElement.js"></script>

    <link rel="icon" href="{assets}/assets/images/icons/unity-icon.svg" type="image/x-icon" />
</svelte:head>

    <article>

        <section>
            <h1>Unity Best Practices</h1>
            <p>
                Making a game is very hard. There are a million sides to work on. However, it is possible to code in a
                certain way to avoid problems in the long run.
            </p>
            <WarningTip>
            This guide goes over the practices <b>I personnally</b> consider the best. This is meant more as a
                basis than
                as a global truth.
            </WarningTip>
            <WarningTip>Most practices will increase development time and cost. I simply present the <i>ideal world</i>.
            </WarningTip>
        </section>

        <section>
            <h2>Enable Nullables</h2>
            <h3>Issue</h3>
            <p>
                When handling objects in Unity, it is possible to get a <code>NullReferenceException</code> in certain
                methods. This is could come from a bunch of sources:
            </p>
            <ul>
                <li>Object getting destroyed at the wrong time</li>
                <li>Components not existing in certain situations</li>
                <li>Mods "breaking" your content</li>
            </ul>
            <p>
                In bref, it is not a good sign. It shows only the intended use case was considered.
            </p>
            <h3>Solution</h3>
            <p>
                The best solution is to allow nullables by default. This will let the IDE know that a certain field
                <i>may</i> be <code>null</code>, which would force to consider this case.
            </p>
            <p>
                The easiest way of adding this is to add <code>-nullable:enable</code> to the <code>csc.rsp</code> file.
                Unity and the IDE should then notify you that certain fields may have a null reference.
            </p>
            <NoticeTip>You need to create the file <code>csc.rsp</code> inside <code>Assets</code>. It should then recompile
                the project.</NoticeTip>
        </section>

        <section>
            <h2>Condense Parameters</h2>
            <h3>Issue</h3>
            <p>
                As a functionality grows, there might be a method that needs more and more parameters. It starts at 3
                parameters, but it grows until it reaches 9. This makes the method less maintainable, and the problem
                will only grow more and more:
            </p>
            <code-block lang="csharp">
void InitV1(int health, int maxHealth, int speed)
&lbrace;
    // ...
&rbrace;

// Several days after
void InitV2(int health, int maxHealth, int speed, int defense, int shield, int maxSlugCount)
&lbrace;
    // ...
&rbrace;
            </code-block>
            <h3>Solution</h3>
            <p>
                When a method starts to have too many parameters, you can put them into a class. The class (or
                <code>struct</code>) only job is to hold data and process it if needed.
            </p>
            <code-block lang="csharp">
struct PlayerStats
&lbrace;
    int health;
    int maxHealth;
    int speed;
&rbrace;

void InitV1(PlayerStats stats)
&lbrace;
    // ...
&rbrace;

// Several days after
struct PlayerStats
&lbrace;
    int health;
    int maxHealth;
    int speed;
    int defense;
    int shield;
    int maxSlugCount;
&rbrace;

void InitV2(PlayerStats stats)
&lbrace;
    // ...
&rbrace;
            </code-block>
            <p>
                The signature stays the same, even if more properties are added. This allows to not bleed the requirements onto
                every method that touch it. They also only need to receive a <code>PlayerStats</code> to pass it along.
            </p>
            <p>
                It is also possible to have utility methods in the data. Using the example above, it is maybe interesting to know how much total health the player has, combining the health and the shields.
            </p>
            <code-block lang="csharp">
struct PlayerStats
&lbrace;
    int maxHealth;
    int shield;

    int GetTotalHealth()
    &lbrace;
        return maxHealth + shield;
    &rbrace;
&rbrace;
            </code-block>
        </section>

        <section>
            <h2>Drop <code>MonoBehaviour</code> (when possible)</h2>
            <h3>Issue</h3>
            <p>
                A habit I see often when making games is to make everything a <code>MonoBehaviour</code>. This stems from
                developers thinking this is needed to interact with the game. However, it is untrue. Making everything a
                <code>MonoBehaviour</code> has a few downsides:
            </p>
            <ul>
                <li>Creates a worst scene hierarchy, littering it with unnecessary objects</li>
                <li>Makes heavier instances</li>
                <li>Locks the class into a single ecosystem</li>
            </ul>
            <h3>Solution</h3>
            <p>
                Use plain old C# class.
            </p>
            <p>
                Really, that is all. Not everything needs to be a component in the world. For example, object pools could be done
                without being present in the world. They simply manage ìnstances of <code>IDisposable</code>, not even knowning
                if they are objects, other classes or something else.
            </p>
            <p>
                Another good example are <a
                    href="https://en.wikipedia.org/wiki/Behavior_tree_(artificial_intelligence,_robotics_and_control)"
                    target="_blank">Behaviour Trees</a>. In essence, they are just a bunch of classes linked together.
                Let's see how it would work with both methods:
            </p>
            <code-block lang="csharp">
// === Using MonoBehaviour ===
class Tree : MonoBehaviour
&lbrace;
    // ...
&rbrace;

class Node : MonoBehaviour
&lbrace;
    // ...
&rbrace;

// Hierarchy:
// |- tree
// |  |- Node1
// |  |- Node2

// === Using Plain C# classes ===
class TreePlayer : MonoBehaviour
&lbrace;
    // ...
&rbrace;

class Tree
&lbrace;
    // ...
&rbrace;

class Node
&lbrace;
    // ...
&rbrace;


// Hierarchy:
// |- tree player
            </code-block>
            <p>
                This makes the code more portable. With the example of the trees, it would be possible to extract the framework into
                a basic <code>.dll</code> file.
            </p>
            <LearnMoreTip>A good real-life example is <a
                    href="https://www.pcgamer.com/games/card-games/slay-the-spire-2-ditched-unity-for-open-source-engine-godot-after-2-years-of-development/"
                    target="_blank">this</a>, where the developers switched engine with little disturbances, because of using plain classes.
            </LearnMoreTip>
        </section>
    </article>