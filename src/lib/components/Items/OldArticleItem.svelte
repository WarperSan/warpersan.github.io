<script lang="ts">
    interface Props {
        title: string;
        href: string;
        tag: string;
    }

    let { title, href, tag }: Props = $props();
</script>

<a
    {href}
    class="flex flex-col gap-2 bg-[color:var(--background-container)] border border-[color:var(--border-container)] no-underline text-[color:var(--text-body)] transition-[border-color] duration-[var(--transition-delay)] p-3 rounded-lg border-solid select-none hover:border-[color:var(--hover-border)]"
>
    <span
        class="w-fit text-[0.7rem] font-medium uppercase tracking-wider rounded bg-[color:var(--background-input)] text-[color:var(--text-secondary)] px-[7px] py-0.5"
    >
        {tag}
    </span>
    <span class="text-sm font-medium text-[color:var(--text-primary)]">
        {title}
    </span>
</a>
