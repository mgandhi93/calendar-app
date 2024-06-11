class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class

  # def as_json(*)
  #   previous = super
  #   previous[:type] = type
  #   previous
  # end
end
