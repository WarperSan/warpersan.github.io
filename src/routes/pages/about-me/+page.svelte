<script>
    import { asset } from "\$app/paths";
    import SkillIcon from "$lib/components/SkillIcon.svelte";
</script>

<svelte:head>
    <title>About Me</title>
    <link href={asset("/styles/skills.css")} rel="stylesheet" />
</svelte:head>

<article>
    <section>
        <h2 id="about-me">About me</h2>
        <p>
            Hi, I'm WarperSan. I am a Canadian programmer that loves to mess
            around libraries. I specialize myself in game making, back-end web
            developement and library creation, mostly all written in C#. I try
            my best to keep my work both efficient and organized.
        </p>
    </section>
    <section>
        <h2 id="tools-and-skills">Skills</h2>
        <p>
            You can see all the tools, languages and frameworks I use or once
            used.
        </p>
        <div id="skills-container">
            <div>
                <h3 title="All the languages I use">Languages</h3>
                <div class="skills">
                    <SkillIcon skill="csharp" />
                    <SkillIcon skill="ts" />
                    <SkillIcon skill="php" />
                    <SkillIcon skill="js" />
                    <SkillIcon skill="cpp" />
                    <SkillIcon skill="java" />
                    <SkillIcon skill="lua" />
                </div>
            </div>

            <div>
                <h3 title="All the scripting and markup languages I use">
                    Markup & Scripting
                </h3>
                <div class="skills">
                    <SkillIcon skill="html" />
                    <SkillIcon skill="css" />
                    <SkillIcon skill="bash" />
                    <SkillIcon skill="markdown" />
                </div>
            </div>

            <div>
                <h3 title="All the engines and frameworks I use">
                    Engines & Frameworks
                </h3>
                <div class="skills">
                    <SkillIcon skill="unity" />
                    <SkillIcon skill="nodejs" />
                    <SkillIcon skill="jquery" />
                    <SkillIcon skill="react" />
                    <SkillIcon skill="codeigniter" />
                </div>
            </div>

            <div>
                <h3 title="All the databases I use">Databases</h3>
                <div class="skills">
                    <SkillIcon skill="mysql" />
                    <SkillIcon skill="mongodb" />
                </div>
            </div>

            <div>
                <h3 title="All operating systems I use">Operating Systems</h3>
                <div class="skills">
                    <SkillIcon skill="windows11" />
                    <SkillIcon skill="linux" />
                </div>
            </div>

            <div>
                <h3 title="All development tools I use">Dev Tools</h3>
                <div class="skills">
                    <SkillIcon skill="github" />
                    <SkillIcon skill="git" />
                    <SkillIcon skill="docker" />
                    <SkillIcon skill="sonarqube" />
                    <SkillIcon skill="swagger" />
                </div>
            </div>
            <div>
                <h3 title="All collaboration tools I use">
                    Collaboration Tools
                </h3>
                <div class="skills">
                    <SkillIcon skill="jira" />
                    <SkillIcon skill="slack" />
                </div>
            </div>
        </div>
    </section>
</article>
