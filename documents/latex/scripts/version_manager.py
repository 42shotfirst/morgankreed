#!/usr/bin/env python3
"""
Unified LaTeX Build System - Version Manager
Handles semantic versioning for LaTeX documents
"""

import sys
import os
from pathlib import Path


class VersionManager:
    """Manages semantic versioning for LaTeX documents"""

    def __init__(self, version_file=".version"):
        self.version_file = Path(version_file)
        self.version = self.read_version()

    def read_version(self):
        """Read current version from file, or return default"""
        if self.version_file.exists():
            with open(self.version_file, 'r') as f:
                version_str = f.read().strip()
                return self.parse_version(version_str)
        return (0, 1, 0)  # Default version

    def write_version(self):
        """Write current version to file"""
        version_str = f"{self.version[0]}.{self.version[1]}.{self.version[2]}"
        with open(self.version_file, 'w') as f:
            f.write(version_str + '\n')
        return version_str

    @staticmethod
    def parse_version(version_str):
        """Parse version string into tuple (major, minor, patch)"""
        parts = version_str.split('.')
        if len(parts) != 3:
            raise ValueError(f"Invalid version format: {version_str}")
        return tuple(int(p) for p in parts)

    def bump_major(self):
        """Bump major version (N.0.0)"""
        self.version = (self.version[0] + 1, 0, 0)
        return self.write_version()

    def bump_minor(self):
        """Bump minor version (x.N.0)"""
        self.version = (self.version[0], self.version[1] + 1, 0)
        return self.write_version()

    def bump_patch(self):
        """Bump patch version (x.x.N)"""
        self.version = (self.version[0], self.version[1], self.version[2] + 1)
        return self.write_version()

    def get_version_str(self):
        """Get current version as string"""
        return f"{self.version[0]}.{self.version[1]}.{self.version[2]}"

    def get_next_versions(self):
        """Get dict of what the next versions would be"""
        major, minor, patch = self.version
        return {
            'major': f"{major + 1}.0.0",
            'minor': f"{major}.{minor + 1}.0",
            'patch': f"{major}.{minor}.{patch + 1}"
        }


def main():
    if len(sys.argv) < 2 or sys.argv[1] in ("--help", "-h"):
        print("Usage: version_manager.py <command> [version_file]")
        print("Commands:")
        print("  show [file]       - Show current and next versions")
        print("  bump <type> [file] - Bump version (major/minor/patch)")
        print("  current [file]    - Show current version only")
        if len(sys.argv) > 1 and sys.argv[1] in ("--help", "-h"):
            sys.exit(0)
        sys.exit(1)

    command = sys.argv[1]
    version_file = sys.argv[2] if len(sys.argv) > 2 else ".version"

    vm = VersionManager(version_file)

    if command == "show":
        current = vm.get_version_str()
        next_versions = vm.get_next_versions()
        print(f"  Major: {current} → {next_versions['major']}")
        print(f"  Minor: {current} → {next_versions['minor']}")
        print(f"  Patch: {current} → {next_versions['patch']}")

    elif command == "current":
        print(vm.get_version_str())

    elif command == "bump":
        if len(sys.argv) < 3:
            print("Error: bump command requires type (major/minor/patch)")
            sys.exit(1)

        bump_type = sys.argv[2]
        version_file = sys.argv[3] if len(sys.argv) > 3 else ".version"
        vm = VersionManager(version_file)

        old_version = vm.get_version_str()

        if bump_type == "major":
            new_version = vm.bump_major()
        elif bump_type == "minor":
            new_version = vm.bump_minor()
        elif bump_type == "patch":
            new_version = vm.bump_patch()
        else:
            print(f"Error: Invalid bump type '{bump_type}'. Use major/minor/patch")
            sys.exit(1)

        print(f"Version bumped: {old_version} → {new_version}")

    else:
        print(f"Error: Unknown command '{command}'")
        sys.exit(1)


if __name__ == "__main__":
    main()
