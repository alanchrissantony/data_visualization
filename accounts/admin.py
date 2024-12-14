from django.contrib import admin
from accounts.models import User, UserProfile

class UserProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = False
    verbose_name_plural = 'Profile'

class UserAdmin(admin.ModelAdmin):
    inlines = (UserProfileInline,)
    list_display = ('username', 'email', 'is_admin', 'is_active', 'is_staff')
    list_filter = ('is_admin', 'is_active', 'is_staff')
    search_fields = ('username', 'email')

admin.site.register(User, UserAdmin)