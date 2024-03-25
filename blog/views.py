from django.shortcuts import render, redirect
from django.contrib import messages
from .forms import ContactForm
from django.db import connection

def home(request):
    return render (request, 'blog/home.html')
def about(request):
    return render (request, 'blog/about.html')

def contact(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            name = form.cleaned_data['name']
            email = form.cleaned_data['email']
            message = form.cleaned_data['message']
            try:
                with connection.cursor() as cursor:
                    cursor.execute(
                        "INSERT INTO blog_contactsubmission (name, email, message, timestamp) VALUES (%s, %s, %s, NOW())",
                        [name, email, message]
                    )
                messages.success(request, 'Your message has been sent successfully!')
                return redirect('blog-contact')
            except Exception as e:
                messages.error(request, f'An error occurred while sending your message: {e}')
    else:
        form = ContactForm()
    return render(request, 'blog/contact.html', {'form': form})
