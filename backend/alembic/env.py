# alembic/env.py
# Alembic migration environment configuration
# Handles database migrations in both offline and online mode

from logging.config import fileConfig
from sqlalchemy import create_engine, pool
from alembic import context

from app.config import settings
from app.database import Base

# Alembic Config object (provides access to .ini file values)
config = context.config
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Target metadata for autogenerate support
target_metadata = Base.metadata

# ---------------------------------------------------
# Offline mode (generates SQL scripts without DB connection)
# ---------------------------------------------------
def run_migrations_offline():
    """
    Run migrations in 'offline' mode.
    Generates SQL scripts without requiring database connection.
    """
    url = settings.database_url
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )
    with context.begin_transaction():
        context.run_migrations()

# ---------------------------------------------------
# Online mode (executes migrations directly on database)
# ---------------------------------------------------
def run_migrations_online():
    """
    Run migrations in 'online' mode.
    Connects to database and applies migrations directly.
    """
    connectable = create_engine(settings.database_url, poolclass=pool.NullPool)

    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)
        with context.begin_transaction():
            context.run_migrations()

# Execute appropriate migration mode
if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()