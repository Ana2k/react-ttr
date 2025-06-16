import os
import datetime
import subprocess
from pathlib import Path

def get_commit_count_today():
    try:
        # Get today's date in YYYY-MM-DD format
        today = datetime.datetime.now().strftime('%Y-%m-%d')
        # Get commit count for today
        result = subprocess.run(
            f'git log --after="{today} 00:00:00" --before="{today} 23:59:59" --format="%H" | wc -l',
            shell=True,
            check=True,
            capture_output=True,
            text=True
        )
        return int(result.stdout.strip())
    except subprocess.CalledProcessError as e:
        print(f"Error getting commit count: {e.stderr}")
        return 0

def get_commit_message():
    commit_count = get_commit_count_today()
    default_message = f"Auto-update: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')} (Commit #{commit_count + 1} today)"
    user_message = input(f"Enter commit message (press Enter for default: '{default_message}'): ").strip()
    return user_message if user_message else default_message

def get_current_branch():
    try:
        result = subprocess.run('git branch --show-current', shell=True, check=True, capture_output=True, text=True)
        return result.stdout.strip()
    except subprocess.CalledProcessError as e:
        print(f"Error getting current branch: {e.stderr}")
        return None

def run_git_command(command):
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        print(f"Success: {result.stdout}")
        return True
    except subprocess.CalledProcessError as e:
        print(f"Error executing command: {command}")
        print(f"Error message: {e.stderr}")
        return False

def main():
    # Get the project root directory (where the script is now located)
    project_root = Path(__file__).parent.absolute()
    
    # Verify we're in the correct directory by checking for package.json
    if not (project_root / 'package.json').exists():
        print("Error: package.json not found. Make sure you're running this script from the correct project directory.")
        return
    
    print(f"Working in project directory: {project_root}")
    
    # Get current branch
    current_branch = get_current_branch()
    if not current_branch:
        print("Could not determine current branch. Stopping execution.")
        return
    
    # Git commands
    commands = [
        f'cd "{project_root}" && git add .',
        f'git commit -m "{get_commit_message()}"',
        f'git push origin {current_branch}'
    ]
    
    # Execute each command
    for command in commands:
        if not run_git_command(command):
            print("Git operation failed. Stopping execution.")
            return

if __name__ == "__main__":
    main() 