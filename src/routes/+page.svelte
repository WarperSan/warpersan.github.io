<script>
    import BriefcaseIcon from "virtual:icons/fa7-solid/briefcase";
    import CommentIcon from "virtual:icons/fa7-solid/comment";

    import { resolve } from "$app/paths";
</script>

<div class="w-4/5 mx-auto my-0 pt-12 pb-10 px-8">
    <p
        class="text-xs tracking-widest uppercase text-[color:var(--text-secondary)] mt-0 mb-4 mx-0"
    >
        Game Developer and Modder
    </p>
    <h1
        class="text-[clamp(2.8rem,7vw,4.5rem)] leading-none text-[color:var(--text-primary)] tracking-[-0.02em] mt-0 mb-2 mx-0"
    >
        Warper<em class="text-[color:var(--brand-500)]">San</em>
    </h1>
    <p class="text-[color:var(--text-body)] leading-[1.75] mt-4 mb-10 mx-0">
        I build puzzle or horror games in Unity. I also create mods for a
        variety of games. Currently studying <a
            class="link"
            href="https://www.uqac.ca/programme/6596/"
            target="_blank">Game Programming</a
        >
        at
        <a class="link" href="https://www.uqac.ca/" target="_blank">
            Université du Québec à Chicoutimi
        </a>
    </p>
    <div class="flex gap-4">
        <a
            class="flex items-center bg-[var(--button-primary)] rounded-2xl p-4 transition-[var(--transition-delay)] hover:text-[color:var(--hover-text)] hover:bg-[var(--hover-background)]"
            href={resolve("/pages/projects")}
        >
            <BriefcaseIcon class="mr-2" /><span>View My Work</span></a
        >
        <a
            class="flex items-center bg-[var(--button-secondary)] rounded-2xl p-4 transition-[var(--transition-delay)] hover:text-[color:var(--hover-text)] hover:bg-[var(--hover-background)]"
            href={resolve("/pages/contact-me")}
        >
            <CommentIcon class="mr-2" /><span>Get in Touch</span>
        </a>
    </div>
</div>
