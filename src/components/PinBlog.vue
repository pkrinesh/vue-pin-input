<script setup lang="ts"></script>

<template>
	<div class="mx-auto max-w-2xl space-y-8 text-pretty px-4 tracking-wider">
		<h1 class="hidden text-4xl font-semibold text-foreground lg:block">Accessible Pin Input</h1>
		<div class="space-y-4 text-foreground/90">
			<h5 class="text-xl font-bold">TL;DR:</h5>
			<p class="text-sm text-foreground/50 lg:hidden">
				Seems like you are on smaller screen! You can read here but must experience on larger
				screen.
			</p>
			<p class="text-lg">
				Crafted a pin input for my app as existing libraries lacked accessibility and focus
				management. The pin input features automatic focus when pressing tab, code completion with
				auto-submit, resetting input on error while focusing the first input, resetting the focus
				when pressed masked button and even retains focus when you're halfway through the pin, click
				outside to lose focus, press tab, and seamlessly resumes where it left off. Please try by
				toggling accessibility check.
			</p>
			<div class="h-[1px] bg-border" />
		</div>
		<div class="mt-4 space-y-8 text-lg text-foreground/70">
			<p>
				On the <span class="lg:hidden">top</span><span class="hidden lg:inline-flex">right</span>,
				you will find the simple-looking pin input card. It is very easy to make; you just have to
				shift the focus, right? Hell no, believe me, this is not easy, especially when you think
				about accessibility. And at the end, you will see why.
			</p>

			<p>
				Now, why bother about accessibility for a pin input that's on our screen for less than 30
				seconds, maybe more for some (😉), but seriously, why should we care?
			</p>

			<p>
				In simple terms, accessibility enables people with disabilities to use the web easily. By
				designing and developing for them, we can really improve the overall user experience for
				everyone. Most think accessibility comes at an expense, but it's an investment that pays off
				in smiles, nods of approval, and forces you to make better products for everyone.
			</p>

			<div class="h-[1px] bg-border" />

			<p>
				I found myself in need of a pin input for an application, and while there are plenty of
				libraries out there, their solutions lacked accessibility and focus management. Even the
				ones that promote accessibility, like radix-ui, ariakit, react-aria, and more, surprisingly
				lacked a pin input component. So, I decided to take on the challenge and created my own
				pin-input which is accessible, unstyled and primitive apis like radix. Now, let's explore
				what I've built.
			</p>

			<ol class="ml-4 list-decimal space-y-8 text-foreground/90 md:ml-8">
				<li>
					The initial input is automatically focused; if not, a quick page refresh should do the
					trick. Now, type '123' – notice how the focus gracefully shifts with each input. Click
					anywhere to lose focus, press
					<key class="rounded-sm bg-muted px-2 py-1 font-medium">tab</key>, and voila! The focus
					smartly returns to where you left off, precisely at the fourth place. Pretty cool, right?
					- Most component lacks this features. You can check -
					<span
						><a
							class="text-primary/70 underline transition-all hover:underline-offset-2"
							href="https://chakra-ui.com/docs/components/pin-input/usage#usage"
							target="_blank"
							tabindex="-1"
							>Chakra ui</a
						></span
					>
				</li>

				<li>
					Moving on to the code completion phase with '123456.' Upon completion, the system takes
					charge, auto-submits, and gracefully disables further interactions. But, whoops! An error
					alert surfaces, clearing all fields and tactfully redirecting focus back to the initial
					pin input. Same will happen when you press the
					<span class="text-primary">Resend</span> button.
				</li>

				<li>When navigating by keyboard, you can't navigate when current input is empty.</li>

				<li>
					Now, hit the <span class="text-primary">Copy</span> button, and You will find The focus
					elegantly glides back to the first spot or its previous spot, if a few inputs are already
					filled. And Same goes for the <span class="text-primary">Masked</span> button, too.
				</li>
			</ol>

			<p class="text-sm text-foreground">
				Too fill the pain, do the same by unchecking accessible check box.
			</p>

			<p>
				This phenomenon is known as 'Roving tabindex', a technique accomplished by tracking the
				tabindex of inputs and recalling the last indexed item. By handling the heavy lifting at the
				component level and exposing the necessary APIs, you can achieve this functionality with
				minimal intervention at the app level.
			</p>

			<p>
				All these little things are not necessary for the simple pin input, but only if you are
				building for yourself. Because this makes a huge difference in real-world applications. This
				kind of UX happens when you make accessibility a priority. Once you immerse yourself in the
				accessibility-first mindset, there's no going back. Keep in mind, Accessibility isn't just
				for those who require it but for everyone's enhanced experience.
			</p>

			<p class="text-xl font-semibold text-foreground/90">
				It's not just about a pin input; it's about crafting digital experiences that leave a
				lasting impact.
			</p>
		</div>
	</div>
</template>
